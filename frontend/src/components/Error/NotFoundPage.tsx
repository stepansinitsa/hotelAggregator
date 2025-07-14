import { Container } from "react-bootstrap"

function ErrorMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Ошибка загрузки страницы</p>
      </Container>
    </Container>
  )
}

export default ErrorMain
