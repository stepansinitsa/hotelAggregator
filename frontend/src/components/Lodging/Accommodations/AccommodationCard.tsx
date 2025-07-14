import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/store-hooks";
import { setRoomsState } from "../../../store/accommodations/accommodationsSlice";
import { LodgingAccomodationData } from "../../../types/types.d";
import HotelRoomsItemImgs from "./AccommodationImages";

function HotelRoomsItem({ room }: { room: LodgingAccomodationData }) {
  const role = useAppSelector(state => state.user.role);
  const dispatch = useDispatch();

  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container>
        <Row className="mt-2">
          <Col>
            <HotelRoomsItemImgs images={room.images} />
          </Col>
          <Col>
            <p className="fs-3 text-uppercase">{room.title}</p>
            <p className="text-muted">{room.description}</p>
            <Link to={'/reserve-room'} className="text-decoration-none m-1">
              <Button onClick={() => dispatch(setRoomsState({ currentRoom: room }))}>Бронировать</Button>
            </Link>
            {role === 'admin' && 
              <Link to={'/update-room'} className="text-decoration-none m-1">
                <Button variant="warning" onClick={() => dispatch(setRoomsState({ currentRoom: room }))}>Изменить</Button>
              </Link>
            }
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default HotelRoomsItem