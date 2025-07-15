import { Button, Container, Table } from "react-bootstrap";
import { BookingData } from "../../types/types.d";

interface BookingTableProps {
  list: BookingData[];
  handleDelete: Function;
}

function ReservationsTable({ list, handleDelete }: BookingTableProps) {
  return (
    <Container>
      {list.length > 0 ? (
        <>
          <p className="text-muted mb-3">Пользователь: {list[0].userId.email}</p>
          <Table striped hover bordered responsive className="shadow-sm rounded text-center">
            <thead>
              <tr>
                <th>Жильё</th>
                <th>Номер</th>
                <th>Дата заезда</th>
                <th>Дата выезда</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {list.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.hotelId.title}</td>
                  <td>{booking.roomId.title}</td>
                  <td>{new Date(booking.dateStart).toLocaleDateString()}</td>
                  <td>{new Date(booking.dateEnd).toLocaleDateString()}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(booking._id)}>
                      Отменить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="text-muted text-center mt-3">Нет активных бронирований</p>
      )}
    </Container>
  );
}

export default ReservationsTable;