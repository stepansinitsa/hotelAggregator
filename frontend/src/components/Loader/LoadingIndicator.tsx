import { Container, Spinner } from "react-bootstrap";

function LoaderMain() {
  return (
    <Container className="p-2 d-flex justify-content-center mt-3">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </Spinner>
    </Container>
  );
}

export default LoaderMain;