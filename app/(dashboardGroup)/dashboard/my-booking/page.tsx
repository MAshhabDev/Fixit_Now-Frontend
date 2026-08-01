import { BookingsAction } from "../_actions/getMyBookingsAction";
import CustomerBookingListUI from "../_components/bookingComponents";


const MyBookingPage = async () => {
  const bookingsRes = await BookingsAction();

  const realBookingsData = bookingsRes?.data || [];

  return <CustomerBookingListUI bookings={realBookingsData} />;
};

export default MyBookingPage;