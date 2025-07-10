import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { accommodationApi } from "../../../api/api-client";
import { setAccommodationsState } from "../../../store/accommodations/accommodationsSlice";
import AccommodationList from "./AccommodationList";
import LoadingIndicator from "../../Loader/LoadingIndicator";

const AccommodationGrid = () => {
  const dispatch = useAppDispatch();
  const currentLodging = useAppSelector((state) => state.lodging.current);
  const { list, limit, offset, loading, titleSearch } = useAppSelector(
    (state) => state.accommodations
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!currentLodging._id) return;

    dispatch(setAccommodationsState({ loading: true }));

    accommodationApi.search({
      lodgingId: currentLodging._id,
      name: titleSearch,
      limit,
      offset,
      isActive: true,
    })
      .then((result) => {
        if (result.length > 0) {
          dispatch(setAccommodationsState({ list: result, loading: false }));
        } else {
          dispatch(setAccommodationsState({ list: [], loading: false }));
        }
      })
      .catch(() => {
        setError(true);
        iziToast.error({
          message: "Не удалось загрузить список аккомодаций",
          position: "bottomCenter",
        });
      });
  }, [offset, titleSearch]);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-3 mb-4 text-center">
        <h3 className="fs-5 fw-semibold">Доступные аккомодации</h3>
      </Container>

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-center text-danger">Произошла ошибка при загрузке данных</p>
      ) : (
        <AccommodationList list={list} />
      )}
    </>
  );
};

export default AccommodationGrid;