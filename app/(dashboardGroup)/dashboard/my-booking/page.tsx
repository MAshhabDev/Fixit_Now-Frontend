import { BookingAction } from "../_actions/myBokking";
import MyBookingsPage from "../_components/bookingComponents";

const MyBookingPage = async () => {
  const bookingsRes = await BookingAction();

  const realBookingsData = bookingsRes?.data || [];

  return <MyBookingsPage bookings={realBookingsData} />;
};

export default MyBookingPage;