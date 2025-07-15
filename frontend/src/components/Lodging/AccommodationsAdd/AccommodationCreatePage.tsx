import { Container } from "react-bootstrap";
import { useAppSelector } from "../../../store/store-hooks";
import HotelRoomsAddForm from "./AccommodationCreateForm";

function HotelsRoomsAddMain() {
  const currentHotel = useAppSelector((state) => state.hotels.currentHotel);

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <h3 className="fs-5 fw-semibold">Добавление нового жилья</h3>
      <p className="text-muted mb-3">Объект размещения: {currentHotel.title}</p>
      <HotelRoomsAddForm />
    </Container>
  );
}

export default HotelsRoomsAddMain;