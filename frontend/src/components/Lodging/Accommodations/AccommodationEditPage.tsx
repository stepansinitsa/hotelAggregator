import { Container } from "react-bootstrap";
import AccommodationEditForm from "./AccommodationEditForm";

function AccommodationEditPage() {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Редактирование аккомодации</h3>
        <p className="text-muted">Измените данные аккомодации</p>
        <AccommodationEditForm />
      </Container>
    </Container>
  );
}

export default AccommodationEditPage;