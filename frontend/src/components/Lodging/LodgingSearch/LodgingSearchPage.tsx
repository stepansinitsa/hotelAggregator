import { Container } from "react-bootstrap";
import LodgingGrid from "../LodgingList/LodgingGrid";
import LodgingSearchForm from "./LodgingSearchForm";

const LodgingSearchPage = () => {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Поиск жилья</h3>
        <LodgingSearchForm />
      </Container>
      <LodgingGrid />
    </Container>
  );
};

export default LodgingSearchPage;