import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // Redirect if not authenticated
  if (!user) {
    redirect('/auth/signin');
  }

  // Map Clerk user to Header component props
  const headerUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    emailAddresses: user.emailAddresses.map(email => ({
      emailAddress: email.emailAddress
    })),
    role: 'CLIENT', // You can get this from user metadata or database
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:block">
        <Sidebar userRole="CLIENT" />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={headerUser} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
