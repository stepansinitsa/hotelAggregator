import { Container } from "react-bootstrap"
import HotelsAddForm from "./LodgingCreateForm"

function HotelsAdd() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Добавить отель</p>
        <HotelsAddForm />
      </Container>
    </Container>
  )
}

export default HotelsAdd