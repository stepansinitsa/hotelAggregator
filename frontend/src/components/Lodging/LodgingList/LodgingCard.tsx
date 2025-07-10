import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/store-hooks";
import { Lodging } from "../../../types/types.d";
import LodgingImages from "./LodgingImages";

interface LodgingCardProps {
  lodging: Lodging;
  showBtn: boolean;
}

const LodgingCard = ({ lodging, showBtn }: LodgingCardProps) => {
  const role = useAppSelector((state) => state.user.role);

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Row className="mt-2">
        <Col md={5}>
          <LodgingImages images={lodging.images} />
        </Col>
        <Col md={7}>
          <h4 className="fs-5 text-uppercase">{lodging.name}</h4>
          <p className="text-muted">{lodging.description}</p>
          {showBtn && (
            <Link to={`/lodging?id=${lodging._id}`} className="text-decoration-none">
              <Button variant="primary">Подробнее</Button>
            </Link>
          )}
          {role === "admin" && (
            <Link to={`/edit-lodging?id=${lodging._id}`} className="ms-2">
              <Button variant="warning">Редактировать</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LodgingCard;