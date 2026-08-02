import { getTechnician } from "./_actions/getTechnician";
import { updateStatus } from "./_actions/updateStatus";
import TechnicianDashboardUI from "./_components/DashboardUi";

export default async function TechnicianDashboardPage() {
  const bookingsRes = await getTechnician();
  const bookings = bookingsRes?.data || [];

  return (
    <TechnicianDashboardUI updateStatus={updateStatus} bookings={bookings} />
  );
}