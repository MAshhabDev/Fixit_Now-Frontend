import { PaymentHistoryAction } from "../_actions/paymentHistoryAction";
import PaymentHistoryPage from "../_components/paymentHistory";

const PaymentHistory = async () => {
  const paymentRes = await PaymentHistoryAction();

  const history = paymentRes?.data || [];

  return < PaymentHistoryPage history={history} />;
};

export default PaymentHistory;
