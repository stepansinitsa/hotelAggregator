import { Container } from "react-bootstrap";
import { useAppSelector } from "../../store/store-hooks";
import SupportForm from "./AssistanceCreateForm";
import SupportList from "./AssistanceList";

function SupportMain() {
  const user = useAppSelector((state) => state.user);

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <h3 className="fs-5 fw-semibold">Сообщения поддержки</h3>
      {user.role === 'client' && <SupportForm />}
      <SupportList />
    </Container>
  );
}

export default SupportMain;