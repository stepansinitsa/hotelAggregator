import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SupportRequestData } from "../../types/types.d";

interface AssistanceTableProps {
  list: SupportRequestData[];
}

function SupportTable({ list }: AssistanceTableProps) {
  return (
    <Container>
      {list.length > 0 ? (
        <>
          <Table striped hover bordered responsive className="shadow-sm rounded text-center">
            <thead>
              <tr>
                <th>Имя</th>
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
                  <td>{ticket.userId.contactPhone || "-"}</td>
                  <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/chat?id=${ticket._id}&email=${ticket.userId.email}`} className="text-decoration-none">
                      <Button variant="warning" size="sm">Перейти</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="text-muted text-center mt-3">Нет активных обращений</p>
      )}
    </Container>
  );
}

export default SupportTable;