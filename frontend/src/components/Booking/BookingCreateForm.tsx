import iziToast from "izitoast";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { bookingApi } from "../../api/api-client";
import { useAppSelector } from "../../store/store-hooks";

const BookingCreateForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const user = useAppSelector((state) => state.user);
  const currentLodging = useAppSelector((state) => state.lodging.current);
  const currentAccommodation = useAppSelector(
    (state) => state.accommodations.current
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      iziToast.error({
        message: "Дата окончания должна быть больше даты начала",
        position: "bottomCenter",
      });
      return;
    }

    if (start.getTime() < Date.now()) {
      iziToast.error({
        message: "Дата начала не может быть раньше текущей даты",
        position: "bottomCenter",
      });
      return;
    }

    const data = {
      userId: user.id,
      lodgingId: currentLodging._id,
      accommodationId: currentAccommodation._id,
      dateStart: startDate,
      dateEnd: endDate,
    };

    try {
      await bookingApi.create(data);
      iziToast.success({
        message: `Вы забронировали "${currentAccommodation.name}" в "${currentLodging.name}"`,
        position: "bottomCenter",
      });

      navigate(`/bookings?id=${user.id}`);
    } catch (err) {
      iziToast.error({
        message: err.message || "Ошибка при бронировании",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Container className="bg-white rounded shadow-sm p-3">
      <Container>
        <h3 className="fs-5 fw-semibold">Бронирование номера</h3>
        <p className="text-muted">Гостиница: {currentLodging.name}</p>
        <p className="text-muted">Номер: {currentAccommodation.name}</p>

        <Form onSubmit={handleSubmit} className="mb-3">
          <Form.Group className="mb-3" controlId="form-date-start">
            <Form.Label>Дата заезда</Form.Label>
            <Form.Control
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="form-date-end">
            <Form.Label>Дата выезда</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
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
    </Container>
  );
};

export default BookingCreateForm;