import { Container } from "react-bootstrap";
import LodgingCreateForm from "./LodgingCreateForm";

function LodgingCreatePage() {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Добавить объект размещения</h3>
        <p className="text-muted">Заполните поля ниже, чтобы создать новую гостиницу</p>
        <LodgingCreateForm />
      </Container>
    </Container>
  );
}

export default LodgingCreatePage;