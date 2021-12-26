import StripeCheckout from "react-stripe-checkout";
import http from "../components/service/httpService";
import popupSuccess from "sweetalert2";

const Payment = ({ setLoading, ...details }) => {
  const { totalamount } = details;
  const onToken = async (token) => {
    const bookingDetails = {
      ...details,
      token,
    };
    try {
      setLoading(true);
      await (
        await http.post("/api/booking/save", bookingDetails)
      ).data;
      setLoading(false);
      popupSuccess
        .fire(
          "Congratulations",
          "You have booked this room successfully!",
          "success"
        )
        .then(() => {
          window.location.href = "/bookings";
        });
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <StripeCheckout
      token={onToken}
      currency="PHP"
      amount={totalamount * 100}
      stripeKey="pk_test_51K8JSHHUKHwFxlbg3iHqSCJoku8Fs9sTH6pCnycU2J4TpZ5TU4yE3BSDm1c76o61F3bnJpCzK2uZT6ihAYSjm3yM003Kh19Rtt"
    >
      <button className="btn btn-primary">Pay Now</button>
    </StripeCheckout>
  );
};

export default Payment;
