# Credit Mend

A comprehensive credit repair business management system built with Next.js, TypeScript, and Prisma.

## Features

### Core Functionality

- **User Management**: Role-based authentication (Admin, Manager, Agent, Client)
- **Client Management**: Complete client profiles with onboarding workflows
- **Case Management**: Track credit repair cases from start to finish
- **Credit Report Processing**: Import, analyze, and track credit reports from all bureaus
- **Dispute Generation**: Automated dispute letter creation and tracking
- **Communication Center**: Integrated messaging and notifications
- **Document Management**: Secure file storage with encryption
- **Payment Processing**: Subscription management and billing
- **Analytics Dashboard**: Business insights and reporting

### Compliance & Security

- CROA (Credit Repair Organizations Act) compliant
- FCRA (Fair Credit Reporting Act) compliant
- GLBA data security standards
- Encrypted sensitive data (SSN, account numbers)
- Audit logging for all actions
- Role-based access control

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **UI Components**: Shadcn/ui
- **Payments**: Stripe
- **Email**: Resend
- **File Storage**: Local/Cloud storage with encryption

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd credit-repair-crm
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/credit_repair_crm"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
EMAIL_FROM="noreply@yourcompany.com"
RESEND_API_KEY="re_..."
UPLOAD_DIR="./uploads"
ENCRYPTION_KEY="your-32-character-encryption-key"
```

4. Set up the database:

```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses a comprehensive database schema with the following key models:

- **Users & Authentication**: Users, Accounts, Sessions
- **Client Management**: ClientProfiles, Cases, Subscriptions
- **Credit Data**: CreditReports, CreditAccounts, Inquiries, PublicRecords
- **Dispute Management**: Disputes, Communications, Tasks
- **Document Management**: Documents with encryption
- **Communication**: Communications, Notifications
- **Payments**: Subscriptions, Payments
- **Audit**: AuditLogs for compliance

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Dashboard pages
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── dashboard/        # Dashboard-specific components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript type definitions
└── prisma/               # Database schema and migrations
```

## User Roles

### Client

- View personal dashboard
- Upload documents
- Track case progress
- Communicate with agents
- Manage billing

### Agent

- Manage assigned clients
- Create and track disputes
- Generate dispute letters
- Update case status
- Client communication

### Manager

- All agent permissions
- View all clients and cases
- Generate reports
- Manage team performance
- Business analytics

### Administrator

- All permissions
- User management
- System settings
- Compliance oversight
- Full system access

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma client

### Adding New Features

1. Update database schema in `prisma/schema.prisma`
2. Run migration: `npx prisma migrate dev`
3. Create API routes in `src/app/api/`
4. Build UI components in `src/components/`
5. Add pages in `src/app/`

## Deployment

### Environment Setup

1. Set up production database
2. Configure all environment variables
3. Set up file storage (AWS S3, etc.)
4. Configure email service (Resend)
5. Set up payment processing (Stripe)

### Build and Deploy

```bash
npm run build
npm run start
```

## Security Considerations

- All sensitive data is encrypted at rest
- API routes protected with authentication
- Role-based access control
- Audit logging for compliance
- Secure file upload handling
- Input validation and sanitization

## Compliance

This CRM is designed to be compliant with:

- Credit Repair Organizations Act (CROA)
- Fair Credit Reporting Act (FCRA)
- Gramm-Leach-Bliley Act (GLBA)
- State-specific credit repair regulations

## Support

For support and questions:

- Check the documentation
- Review the database schema
- Contact the development team

## License

This project is licensed under the MIT License.
# credit-mend
