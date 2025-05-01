import AdminComplaintsTable from '@/app/Component/AdminComplaint';
export default function AdminPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <AdminComplaintsTable />
    </main>
  );
}
