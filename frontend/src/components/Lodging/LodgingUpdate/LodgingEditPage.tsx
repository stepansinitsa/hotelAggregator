import { Container } from "react-bootstrap";
import LodgingEditForm from "./LodgingEditForm";

function LodgingEditPage() {
  const lodging = useAppSelector((state) => state.lodging.current);

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Редактирование жилья</h3>
        <p className="text-muted">Текущий объект: {lodging.name}</p>
        <LodgingEditForm />
      </Container>
    </Container>
  );
}

export default LodgingEditPage;