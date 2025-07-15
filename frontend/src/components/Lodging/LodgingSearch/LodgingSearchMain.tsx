import { Container } from "react-bootstrap";
import HotelsSearchForm from "./LodgingSearchForm";

function HotelsSearch() {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Поиск по названию отеля</h3>
        <HotelsSearchForm />
      </Container>
    </Container>
  );
}

export default HotelsSearch;