import { Container } from "react-bootstrap";
import { useAppSelector } from "../../../store/store-hooks";
import HotelRoomsAddForm from "./AccommodationCreateForm";

function HotelsRoomsAddMain() {
  const currentHotel = useAppSelector(state => state.hotels.currentHotel);

  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Добавить жилье</p>
        <p className="text-muted">Отель: {currentHotel.title}</p>
        <HotelRoomsAddForm />
      </Container>
    </Container>
  )
}

export default HotelsRoomsAddMain