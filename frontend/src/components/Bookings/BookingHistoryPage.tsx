import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/api-client";
import { useAppSelector } from "../../store/store-hooks";
import LoaderMain from "../Loader/LoadingIndicator";
import ReservationsTable from "./BookingTable";

function ReservationsList() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.id);
  const queryParams = new URLSearchParams(location.search);
  const { reservationsApi } = useFetchData();

  const handleDelete = (bookingId: string) => {
    try {
      reservationsApi.removeReservation(bookingId, userId)
        .then(() => {
          iziToast.success({
            message: "Бронь успешно удалена",
            position: "bottomCenter",
          });
          setRefresh(!refresh);
        })
        .catch((err) => {
          iziToast.error({
            message: err?.data?.message || "Ошибка при удалении брони",
            position: "bottomCenter",
          });
        });
    } catch (e) {
      console.error("Ошибка при удалении брони:", e);
    }
  };

  useEffect(() => {
    if (!queryParams.get("id")) {
      navigate("/error");
      return;
    }

    const id: any = queryParams.get("id");

    setLoading(true);
    setError(false);

    reservationsApi.search({ userId: id })
      .then((result) => {
        setBookings(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === "string"
            ? err.data.message
            : err.data.message[0],
          position: "bottomCenter",
        });
      });
  }, [refresh]);

  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : error ? (
        <p className="text-center text-danger mt-3">Ошибка загрузки данных</p>
      ) : bookings.length === 0 ? (
        <p className="text-muted text-center mt-3">Нет активных бронирований</p>
      ) : (
        <ReservationsTable list={bookings} handleDelete={handleDelete} />
      )}
    </>
  );
}

export default ReservationsList;