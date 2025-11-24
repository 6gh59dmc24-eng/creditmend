import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseCreditReport } from '@/lib/credit-report-parser';
import { DisputeAnalyzer } from '@/lib/dispute-analyzer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // In a real app, strict auth check:
    // if (!session) return new NextResponse("Unauthorized", { status: 401 })

    const body = await req.json();
    const { content, clientId, caseId } = body;

    if (!content) {
      return new NextResponse('Missing report content', { status: 400 });
    }

    // 1. Parse the report
    const parsedReport = parseCreditReport(content);
    const serializedReport = JSON.parse(
      JSON.stringify(parsedReport)
    ) as Prisma.JsonObject;

    // 2. Find or create the client (mock logic if clientId not provided)
    // For now, we assume a valid clientId is passed, or we use the session user id if available
    const targetClientId = clientId || session?.user?.id;

    if (!targetClientId) {
      return new NextResponse('Client ID required', { status: 400 });
    }

    // 3. Save Credit Report to DB
    const savedReport = await prisma.creditReport.create({
      data: {
        clientId: targetClientId,
        bureau: parsedReport.bureau,
        reportDate: new Date(parsedReport.reportDate),
        score: parsedReport.score,
        reportData: serializedReport,
        accounts: {
          create: parsedReport.accounts.map(acc => ({
            creditorName: acc.creditorName,
            accountNumber: acc.accountNumber, // In real app, encrypt this
            accountType: acc.accountType,
            status: acc.status,
            balance: acc.balance,
            limit: acc.limit,
            paymentStatus: acc.paymentStatus,
            latePayments: acc.latePayments,
          })),
        },
        inquiries: {
          create: parsedReport.inquiries.map(inq => ({
            inquirerName: inq.inquirerName,
            inquiryDate: new Date(inq.inquiryDate),
            inquiryType: inq.inquiryType,
          })),
        },
        publicRecords: {
          create: parsedReport.publicRecords.map(rec => ({
            recordType: rec.recordType,
            filingDate: rec.filingDate ? new Date(rec.filingDate) : undefined,
            caseNumber: rec.caseNumber,
          })),
        },
      },
      include: {
        accounts: true,
        inquiries: true,
        publicRecords: true,
      },
    });

    // 4. Analyze for Disputes
    const suggestedDisputes = DisputeAnalyzer.analyze(parsedReport);

    // 5. Handle Case (Create or Use)
    let targetCaseId = caseId;

    if (!targetCaseId) {
      const caseNumber = `CASE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const newCase = await prisma.case.create({
        data: {
          caseNumber,
          clientId: targetClientId,
          status: 'OPEN',
          priority: 'MEDIUM',
          description: `Auto-generated case from credit report upload on ${new Date().toLocaleDateString()}`,
          startDate: new Date(),
        },
      });
      targetCaseId = newCase.id;
    }

    // 6. Create Draft Disputes
    const createdDisputes = [];
    for (const dispute of suggestedDisputes) {
      // Find related account ID if applicable
      let relatedAccountId = undefined;
      let relatedInquiryId = undefined;
      let relatedPublicRecordId = undefined;

      if (dispute.itemType === 'ACCOUNT') {
        const acc = savedReport.accounts.find(
          a => a.accountNumber === dispute.relatedItemId
        );
        relatedAccountId = acc?.id;
      } else if (dispute.itemType === 'INQUIRY') {
        const inq = savedReport.inquiries.find(
          i => i.inquirerName === dispute.relatedItemId
        );
        relatedInquiryId = inq?.id;
      } else if (dispute.itemType === 'PUBLIC_RECORD') {
        // Using case number to match public record
        const rec = savedReport.publicRecords.find(
          r => r.caseNumber === dispute.relatedItemId
        );
        relatedPublicRecordId = rec?.id;
      }

      const newDispute = await prisma.dispute.create({
        data: {
          caseId: targetCaseId,
          bureau: dispute.bureau,
          disputeType: dispute.type,
          reason: dispute.reason,
          priority: dispute.priority,
          status: 'DRAFT',
          accountId: relatedAccountId,
          inquiryId: relatedInquiryId,
          publicRecordId: relatedPublicRecordId,
          customReason: dispute.details,
        },
      });
      createdDisputes.push(newDispute);
    }

    return NextResponse.json({
      success: true,
      reportId: savedReport.id,
      caseId: targetCaseId,
      disputeCount: createdDisputes.length,
      disputes: createdDisputes,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
