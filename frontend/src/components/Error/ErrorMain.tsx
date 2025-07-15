import { Container } from "react-bootstrap";

function ErrorMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2 my-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Страница не найдена</h3>
        <p className="text-muted">Запрошенный ресурс отсутствует</p>
      </Container>
    </Container>
  );
}

export default ErrorMain;