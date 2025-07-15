import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import useFetchData from "../../../api/api-client";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { setRoomsState } from "../../../store/accommodations/accommodationsSlice";
import LoaderMain from "../../Loader/LoadingIndicator";
import HotelRoomsItems from "./AccommodationMain";

function HotelRoomsList() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { roomsApi } = useFetchData();
  const roomsState = useAppSelector((state) => state.rooms);
  const currentHotel = useAppSelector((state) => state.hotels.currentHotel);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);
    setLoading(true);

    dispatch(setRoomsState({ loading: true }));

    roomsApi.search({
      limit: roomsState.limit,
      offset: roomsState.offset,
      title: roomsState.titleSearch,
      hotel: currentHotel._id,
      isEnabled: true,
    })
      .then((result) => {
        if (result.data.length > 0) {
          dispatch(setRoomsState({ list: result.data, loading: false }));
        } else {
          dispatch(setRoomsState({ offset: 0, loading: false, list: [] }));
        }
      })
      .catch((err) => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string'
            ? err.data.message
            : err.data.message[0],
          position: 'bottomCenter',
        });
      })
      .finally(() => setLoading(false));
  }, [roomsState.offset, roomsState.titleSearch]);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3 text-center">
        <h3 className="fs-5 fw-semibold">Доступные номера</h3>
      </Container>

      {loading ? (
        <LoaderMain />
      ) : error ? (
        <p className="text-center text-danger mt-3">Ошибка загрузки данных</p>
      ) : !roomsState.list.length ? (
        <p className="text-center text-muted mt-3">Нет доступных номеров</p>
      ) : (
        <HotelRoomsItems list={roomsState.list} />
      )}
    </>
  );
}

export default HotelRoomsList;