import { BookingAction } from "./_actions/myBokking";
import CustomerDashboardUI from "./_components/dashboardComponent";

export default async function CustomerDashboardPage() {
  const bookingsRes = await BookingAction();
  const bookings = bookingsRes?.data || [];

  return <CustomerDashboardUI bookings={bookings} />;
}