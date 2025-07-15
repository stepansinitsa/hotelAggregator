import { Container } from "react-bootstrap";
import HotelsUpdateForm from "./LodgingEditForm";

function HotelsUpdateMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <h3 className="fs-5 fw-semibold">Редактировать отель</h3>
      <HotelsUpdateForm />
    </Container>
  );
}

export default HotelsUpdateMain;