import { Container } from "react-bootstrap";
import { useAppSelector } from "../../store/store-hooks";
import AssistanceCreateForm from "./AssistanceCreateForm";
import AssistanceTicketGrid from "./AssistanceTicketGrid";

function AssistanceDashboard() {
  const user = useAppSelector((state) => state.user);

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Центр поддержки</h3>
        {user.role === "client" && <AssistanceCreateForm />}
      </Container>
      <AssistanceTicketGrid />
    </Container>
  );
}

export default AssistanceDashboard;