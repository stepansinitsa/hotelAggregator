import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/store-hooks";
import { setCurrentAccommodation } from "../../../store/accommodations/accommodationsSlice";
import AccommodationImages from "./AccommodationImages";

interface AccommodationCardProps {
  accommodation: AccommodationDetails;
}

const AccommodationCard = ({ accommodation }: AccommodationCardProps) => {
  const role = useAppSelector((state) => state.user.role);
  const dispatch = useDispatch();

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <Row className="mt-2">
          <Col md={5}>
            <AccommodationImages images={accommodation.images} />
          </Col>
          <Col md={7}>
            <h4 className="fs-5 text-uppercase">{accommodation.name}</h4>
            <p className="text-muted">{accommodation.description}</p>
            <Link to={'/book-accommodation'} className="text-decoration-none me-2">
              <Button onClick={() => dispatch(setCurrentAccommodation({ current: accommodation }))}>
                Забронировать
              </Button>
            </Link>
            {role === 'admin' && (
              <Link to={`/edit-accommodation?id=${accommodation._id}`} className="text-decoration-none">
                <Button variant="warning" onClick={() => dispatch(setCurrentAccommodation({ current: accommodation }))}>
                  Редактировать
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AccommodationCard;