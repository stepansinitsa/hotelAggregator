import { Container } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mt-4 mb-4">
      <Container>
        <h2 className="fs-5 fw-semibold">Страница не найдена</h2>
      </Container>
    </Container>
  );
};

export default NotFoundPage;