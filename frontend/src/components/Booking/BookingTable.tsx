import { Button, Container, Table } from "react-bootstrap";
import { BookingData } from "../../types/types.d";

interface BookingTableProps {
  bookings: BookingData[];
  onCancel: (id: string) => void;
}

const BookingTable = ({ bookings, onCancel }: BookingTableProps) => {


  return (
    <Container>
      {bookings.length === 0 ? (
        <p className="text-muted text-center mt-3">Нет активных бронирований</p>
      ) : (
        <>
          <p className="text-muted">Пользователь: {bookings[0].userId.email}</p>
          <Table striped bordered hover responsive className="mt-2 text-center">
            <thead>
              <tr>
                <th>Объект размещения</th>
                <th>Номер</th>
                <th>Дата заезда</th>
                <th>Дата выезда</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr key={item._id}>
                  <td>{item.lodgingId.name}</td>
                  <td>{item.roomId.name}</td>
                  <td>{new Date(item.dateStart).toLocaleDateString()}</td>
                  <td>{new Date(item.dateEnd).toLocaleDateString()}</td>
                  <td>
                    <Button variant="danger" onClick={() => onCancel(item._id)}>
                      Отменить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default BookingTable;