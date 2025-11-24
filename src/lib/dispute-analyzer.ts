import { ImportedCreditReport } from './credit-report-parser';
import { DisputeType, Priority, CreditBureau } from '@prisma/client';

export interface SuggestedDispute {
  type: DisputeType;
  reason: string;
  priority: Priority;
  bureau: CreditBureau;
  relatedItemId?: string;
  itemType: 'ACCOUNT' | 'INQUIRY' | 'PUBLIC_RECORD';
  details: string;
}

export class DisputeAnalyzer {
  static analyze(report: ImportedCreditReport): SuggestedDispute[] {
    const disputes: SuggestedDispute[] = [];

    // Analyze Accounts
    report.accounts.forEach(account => {
      // Rule 1: Collections
      if (account.status === 'COLLECTION') {
        disputes.push({
          type: 'FRAUDULENT_ACTIVITY',
          reason: 'Requesting validation of debt. Unrecognized account.',
          priority: 'HIGH',
          bureau: report.bureau,
          itemType: 'ACCOUNT',
          details: `Collection account from ${account.creditorName} for $${account.balance}`,
          relatedItemId: account.accountNumber,
        });
      }

      // Rule 2: Charge Offs
      if (account.status === 'CHARGE_OFF') {
        disputes.push({
          type: 'INCORRECT_STATUS',
          reason:
            'Challenging charge-off status. Proof of accounting required.',
          priority: 'HIGH',
          bureau: report.bureau,
          itemType: 'ACCOUNT',
          details: `Charge-off from ${account.creditorName}`,
          relatedItemId: account.accountNumber,
        });
      }

      // Rule 3: Late Payments
      if ((account.latePayments || 0) > 0 || account.paymentStatus === 'LATE') {
        disputes.push({
          type: 'LATE_PAYMENT_REMOVAL',
          reason: 'Never late. Requesting payment history verification.',
          priority: 'MEDIUM',
          bureau: report.bureau,
          itemType: 'ACCOUNT',
          details: `${account.latePayments} late payments recorded for ${account.creditorName}`,
          relatedItemId: account.accountNumber,
        });
      }
    });

    // Analyze Inquiries
    report.inquiries.forEach(inquiry => {
      if (inquiry.inquiryType === 'HARD') {
        disputes.push({
          type: 'INQUIRY_REMOVAL',
          reason: 'Unauthorized inquiry. No credit application was submitted.',
          priority: 'LOW',
          bureau: report.bureau,
          itemType: 'INQUIRY',
          details: `Hard inquiry from ${inquiry.inquirerName} on ${inquiry.inquiryDate}`,
          relatedItemId: inquiry.inquirerName,
        });
      }
    });

    // Analyze Public Records
    report.publicRecords.forEach(record => {
      disputes.push({
        type: 'PUBLIC_RECORD_REMOVAL',
        reason: 'Requesting procedural validation of public record.',
        priority: 'URGENT',
        bureau: report.bureau,
        itemType: 'PUBLIC_RECORD',
        details: `${record.recordType} filed on ${record.filingDate}`,
        relatedItemId: record.caseNumber,
      });
    });

    return disputes;
  }
}
