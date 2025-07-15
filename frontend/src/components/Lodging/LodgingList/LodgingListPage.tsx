import iziToast from "izitoast";
import { useEffect, useState } from "react";
import useFetchData from "../../../api/api-client";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { setHotelsState } from "../../../store/lodgings/lodgingSlice";
import LoaderMain from "../../Loader/LoadingIndicator";
import HotelsListItems from "./LodgingCard";

function HotelsList() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { hotelsAPI } = useFetchData();
  const hotelsState = useAppSelector((state) => state.hotels);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);
    setLoading(true);

    dispatch(setHotelsState({ loading: true }));

    hotelsAPI.search({
      limit: hotelsState.limit,
      offset: hotelsState.offset,
      title: hotelsState.titleSearch,
    })
      .then((result) => {
        if (result.data.length > 0) {
          dispatch(setHotelsState({ list: result.data, loading: false }));
        } else {
          dispatch(setHotelsState({ offset: 0, loading: false, list: [] }));
        }
      })
      .catch((err) => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === "string"
            ? err.data.message
            : err.data.message[0],
          position: "bottomCenter",
        });
      })
      .finally(() => setLoading(false));
  }, [hotelsState.offset, hotelsState.titleSearch]);

  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : error ? (
        <p className="text-center text-danger mt-3">Ошибка загрузки данных</p>
      ) : !hotelsState.list.length ? (
        <p className="text-center text-muted mt-3">Нет доступных отелей</p>
      ) : (
        <HotelsListItems list={hotelsState.list} />
      )}
    </>
  );
}

export default HotelsList;