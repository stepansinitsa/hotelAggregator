import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Ticket } from "../../types/types.d";

interface AssistanceTicketTableProps {
  list: Ticket[];
}

const AssistanceTicketTable = ({ list }: AssistanceTicketTableProps) => {
  return (
    <Container>
      {list.length === 0 ? (
        <p className="text-muted text-center mt-3">Нет активных обращений</p>
      ) : (
        <Table striped bordered hover responsive className="mt-2">
          <thead>
            <tr>
              <th>Имя клиента</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Дата обращения</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {list.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.userId.name}</td>
                <td>{ticket.userId.email}</td>
                <td>{ticket.userId.contactPhone || "Не указан"}</td>
                <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/chat?id=${ticket._id}&email=${ticket.userId.email}`}
                    className="text-decoration-none"
                  >
                    <Button variant="outline-primary" size="sm">
                      Перейти в чат
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AssistanceTicketTable;