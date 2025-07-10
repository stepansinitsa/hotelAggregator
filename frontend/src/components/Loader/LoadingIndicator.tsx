import { Container, Spinner } from "react-bootstrap";

function LoadingIndicator() {
  return (
    <Container className="p-3 d-flex justify-content-center mt-3">
      <Spinner animation="border" variant="primary" />
    </Container>
  );
}

export default LoadingIndicator;