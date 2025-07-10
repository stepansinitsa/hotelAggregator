import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookingApi } from "../../api/api-client";
import { useAppSelector } from "../../store/store-hooks";
import LoadingIndicator from "../Loader/LoadingIndicator";
import BookingTable from "./BookingTable";

const BookingGrid = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleCancelBooking = (bookingId: string) => {
    try {
      bookingApi.cancel(bookingId, user.id)
        .then(() => {
          iziToast.success({
            message: "Бронь успешно отменена",
            position: "bottomCenter",
          });
          setRefresh(!refresh);
        })
        .catch((err) => {
          iziToast.error({
            message: err.message || "Ошибка при отмене бронирования",
            position: "bottomCenter",
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(false);

    bookingApi.getByUser(user.id)
      .then((result) => {
        setBookings(result.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        iziToast.error({
          message: "Не удалось загрузить список бронирований",
          position: "bottomCenter",
        });
      });
  }, [refresh]);

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-center text-danger">Произошла ошибка</p>
      ) : (
        <BookingTable bookings={bookings} onCancel={handleCancelBooking} />
      )}
    </>
  );
};

export default BookingGrid;