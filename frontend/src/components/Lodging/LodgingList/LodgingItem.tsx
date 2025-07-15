// frontend/src/components/Lodgings/Card/LodgingItem.tsx

import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LodgingData } from "../../../types/types.d";
import HotelsListItemImgs from "./LodgingImages";

function HotelsListItem({ hotel, showBtn }: { hotel: LodgingData; showBtn: boolean }) {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Row>
        <Col xs={12} md={6}>
          <HotelsListItemImgs images={hotel.images} />
        </Col>
        <Col xs={12} md={6}>
          <h3 className="fs-5 text-uppercase">{hotel.title}</h3>
          <p className="text-muted mb-3">{hotel.description}</p>
          {showBtn && (
            <Link to={`/hotel?id=${hotel._id}`} className="text-decoration-none">
              <Button variant="primary" className="mb-2">Подробнее</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default HotelsListItem;