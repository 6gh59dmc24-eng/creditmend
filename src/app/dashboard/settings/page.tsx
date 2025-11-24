import { PasskeySetup } from '@/components/passkey-setup';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <PasskeySetup />
        </section>
      </div>
    </div>
  );
}
