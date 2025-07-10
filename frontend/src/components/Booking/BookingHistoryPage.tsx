import { Container } from "react-bootstrap";
import BookingGrid from "./BookingGrid";

function BookingHistoryPage() {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">История бронирований</h3>
      </Container>
      <BookingGrid />
    </Container>
  );
}

export default BookingHistoryPage;