import { Container } from "react-bootstrap"
import HotelRoomUpdateForm from "./AccommodationEditForm"

function HotelRoomUpdateMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Отредактировать жилье</p>
        <HotelRoomUpdateForm />
      </Container>
    </Container>
  )
}

export default HotelRoomUpdateMain