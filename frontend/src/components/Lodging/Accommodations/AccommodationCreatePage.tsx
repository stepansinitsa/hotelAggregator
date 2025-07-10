import { Container } from "react-bootstrap";
import AccommodationCreateForm from "./AccommodationCreateForm";

function AccommodationCreatePage() {
  const lodging = useAppSelector((state) => state.lodging.current);

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Добавление аккомодации</h3>
        <p className="text-muted">Гостиница: {lodging.name}</p>
        <AccommodationCreateForm />
      </Container>
    </Container>
  );
}

export default AccommodationCreatePage;