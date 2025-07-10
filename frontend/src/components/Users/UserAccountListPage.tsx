import { Container } from "react-bootstrap";
import UserAccountGrid from "./UserAccountGrid";
import UserAccountSearchForm from "./UserAccountSearchForm";

function UserAccountListPage() {
  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Управление аккаунтами</h3>
        <UserAccountSearchForm />
      </Container>
      <UserAccountGrid />
    </Container>
  );
}

export default UserAccountListPage;