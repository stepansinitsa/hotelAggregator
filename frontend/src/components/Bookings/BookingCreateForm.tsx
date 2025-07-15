import iziToast from "izitoast";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/api-client";
import { useAppSelector } from "../../store/store-hooks";

function ReservationsForm() {
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const currentHotel = useAppSelector((state) => state.hotels.currentHotel);
  const currentRoom = useAppSelector((state) => state.rooms.currentRoom);
  const userId = useAppSelector((state) => state.user.id);
  const { reservationsApi } = useFetchData();
  const navigate = useNavigate();

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    if (start >= end) {
      iziToast.error({
        message: "Дата выезда должна быть больше даты заезда",
        position: "bottomCenter",
      });
      return;
    }

    if (start < new Date()) {
      iziToast.error({
        message: "Дата заезда не может быть раньше текущей даты",
        position: "bottomCenter",
      });
      return;
    }

    const data = {
      userId,
      hotelId: currentHotel._id,
      roomId: currentRoom._id,
      dateStart,
      dateEnd,
    };

    try {
      await reservationsApi.addReservation(data);
      iziToast.success({
        message: `Вы успешно забронировали "${currentRoom.title}" в "${currentHotel.title}"`,
        position: "bottomCenter",
      });
      navigate(`/reservations?id=${userId}`);
    } catch (err) {
      iziToast.error({
        message: "Ошибка при бронировании",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container>
        <h3 className="fs-5 fw-semibold">Бронирование номера</h3>
        <p className="text-muted">Объект размещения: {currentHotel.title}</p>
        <p className="text-muted">Номер: {currentRoom.title}</p>
      </Container>

      <Form onSubmit={formHandler} className="mt-3">
        <Form.Group className="mb-3" controlId="form-check-in">
          <Form.Label>Дата заезда</Form.Label>
          <Form.Control
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="form-check-out">
          <Form.Label>Дата выезда</Form.Label>
          <Form.Control
            type="date"
            min={dateStart || new Date().toISOString().split("T")[0]}
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Забронировать
        </Button>{" "}
        <Button variant="secondary" type="reset">
          Очистить
        </Button>
      </Form>
    </Container>
  );
}

export default ReservationsForm;