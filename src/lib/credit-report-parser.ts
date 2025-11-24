import {
  CreditBureau,
  AccountType,
  AccountStatus,
  PaymentStatus,
} from '@prisma/client';

export interface ImportedAccount {
  creditorName: string;
  accountNumber: string;
  accountType: AccountType;
  status: AccountStatus;
  balance: number;
  limit?: number;
  paymentStatus: PaymentStatus;
  lastPaymentDate?: string;
  dateOpened?: string;
  dateClosed?: string;
  latePayments?: number;
  daysLate?: number;
  isDisputed?: boolean;
}

export interface ImportedInquiry {
  inquirerName: string;
  inquiryDate: string;
  inquiryType: 'HARD' | 'SOFT';
}

export interface ImportedPublicRecord {
  recordType: 'BANKRUPTCY' | 'JUDGMENT' | 'LIEN' | 'COLLECTION';
  courtName?: string;
  caseNumber?: string;
  filingDate?: string;
  status?: string;
  amount?: number;
}

export interface ImportedCreditReport {
  clientName: string;
  ssnLast4: string;
  reportDate: string;
  bureau: CreditBureau;
  score: number;
  accounts: ImportedAccount[];
  inquiries: ImportedInquiry[];
  publicRecords: ImportedPublicRecord[];
}

export function parseCreditReport(jsonContent: string): ImportedCreditReport {
  try {
    const data = JSON.parse(jsonContent);

    // Basic validation
    if (!data.bureau || !data.accounts) {
      throw new Error(
        'Invalid credit report format: Missing bureau or accounts'
      );
    }

    return {
      clientName: data.clientName || 'Unknown',
      ssnLast4: data.ssnLast4 || '0000',
      reportDate: data.reportDate || new Date().toISOString(),
      bureau: data.bureau as CreditBureau,
      score: data.score || 0,
      accounts: (data.accounts || []).map((acc: any) => ({
        creditorName: acc.creditorName,
        accountNumber: acc.accountNumber,
        accountType: acc.accountType as AccountType,
        status: acc.status as AccountStatus,
        balance: Number(acc.balance) || 0,
        limit: acc.limit ? Number(acc.limit) : undefined,
        paymentStatus: acc.paymentStatus as PaymentStatus,
        lastPaymentDate: acc.lastPaymentDate,
        dateOpened: acc.dateOpened,
        dateClosed: acc.dateClosed,
        latePayments: Number(acc.latePayments) || 0,
        daysLate: Number(acc.daysLate) || 0,
        isDisputed: Boolean(acc.isDisputed),
      })),
      inquiries: (data.inquiries || []).map((inq: any) => ({
        inquirerName: inq.inquirerName,
        inquiryDate: inq.inquiryDate,
        inquiryType: inq.inquiryType,
      })),
      publicRecords: (data.publicRecords || []).map((rec: any) => ({
        recordType: rec.recordType,
        courtName: rec.courtName,
        caseNumber: rec.caseNumber,
        filingDate: rec.filingDate,
        status: rec.status,
        amount: Number(rec.amount) || 0,
      })),
    };
  } catch (error) {
    throw new Error(
      `Failed to parse credit report: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
