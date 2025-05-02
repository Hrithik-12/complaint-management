import AdminComplaintsTable from '@/app/Component/AdminComplaint';
import Header from '@/app/Component/Header';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-cover bg-center " style={ {backgroundImage: "url('/bgg1.jpg')" }} >
      <Header />

      <div className="flex justify-center px-4 py-10">
        <main className="bg-white bg-opacity-95 max-w-6xl w-full rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-2xl font-bold text-blue-700 hover:underline">
              Admin Dashboard
            </Link>
          </div>

          <AdminComplaintsTable />
        </main>
      </div>
    </div>
  );
}
