import { Container } from "react-bootstrap";
import HotelsAddForm from "./LodgingCreateForm";

function HotelsAdd() {
  return (
    <Container className="bg-white rounded shadow-sm p-3">
      <h3 className="fs-5 fw-semibold">Добавление нового отеля</h3>
      <HotelsAddForm />
    </Container>
  );
}

export default HotelsAdd;