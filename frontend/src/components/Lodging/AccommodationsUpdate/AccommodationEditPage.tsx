import { Container } from "react-bootstrap";
import HotelRoomUpdateForm from "./AccommodationEditForm";

function HotelRoomUpdateMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <h3 className="fs-5 fw-semibold">Редактирование номера</h3>
      <HotelRoomUpdateForm />
    </Container>
  );
}

export default HotelRoomUpdateMain;