import { Container } from "react-bootstrap"
import ReservationsList from "./BookingHistoryPage"

function ReservationsMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Список жилья</p>
      </Container>
      <ReservationsList />
    </Container>
  )
}

export default ReservationsMain