import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/store-hooks";
import { setRoomsState } from "../../../store/accommodations/accommodationsSlice";
import { LodgingAccomodationData } from "../../../types/types.d";
import HotelRoomsItemImgs from "./AccommodationImages";

function HotelRoomsItem({ room }: { room: LodgingAccomodationData }) {
  const role = useAppSelector((state) => state.user.role);
  const dispatch = useDispatch();

  const handleSelectRoom = () => {
    dispatch(setRoomsState({ currentRoom: room }));
  };

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Row className="align-items-center">
        <Col md={5}>
          <HotelRoomsItemImgs images={room.images} />
        </Col>
        <Col md={7}>
          <h4 className="text-uppercase">{room.title}</h4>
          <p className="text-muted mb-3">{room.description}</p>
          <Link to={'/reserve-room'} className="text-decoration-none me-2">
            <Button onClick={handleSelectRoom}>Бронировать</Button>
          </Link>
          {role === 'admin' && (
            <Link to={'/update-room'} className="text-decoration-none">
              <Button variant="warning" onClick={handleSelectRoom}>Изменить</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default HotelRoomsItem;