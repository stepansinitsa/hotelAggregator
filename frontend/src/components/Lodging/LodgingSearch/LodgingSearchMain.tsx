import { Container } from "react-bootstrap";
import HotelsList from "../LodgingList/LodgingList";
import HotelsSearchForm from "./LodgingSearchForm";

function HotelsSearch() {
  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3">
        <Container>
          <p className="fs-2 fw-semibold">Поиск отеля</p>
          <HotelsSearchForm />
        </Container>
      </Container>
      <HotelsList />
    </>
  )
}

export default HotelsSearch