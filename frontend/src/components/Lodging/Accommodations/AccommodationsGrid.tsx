import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { accommodationApi } from "../../../api/api-client";
import { AccommodationDetails } from "../../../types/types";
import AccommodationList from "./AccommodationList";
import LoadingIndicator from "../../Loader/LoadingIndicator";

const AccommodationsGrid = () => {
  const [error, setError] = useState<boolean>(false);
  const { list, limit, offset, titleSearch } = useAppSelector((state) => state.accommodations);
  const currentLodging = useAppSelector((state) => state.lodging.currentLodging);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        dispatch(setLodgingState({ loading: true }));

        const result = await accommodationApi.search({
          limit,
          offset,
          lodgingId: currentLodging._id,
          isActive: true,
        });

        if (result.data.length > 0) {
          dispatch(setLodgingState({ accommodations: result.data, loading: false }));
        } else {
          dispatch(setLodgingState({ accommodations: [], loading: false }));
        }
      } catch (err) {
        setError(true);
        iziToast.error({
          message: "Не удалось загрузить список номеров",
          position: "bottomCenter",
        });
      }
    };

    if (!currentLodging || !currentLodging._id) {
      navigate("/not-found");
      return;
    }

    fetchAccommodations();
  }, [offset]);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-3 mb-4 text-center">
        <Container>
          <h3 className="fs-5 fw-semibold">Доступные варианты размещения</h3>
        </Container>
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

export default AccommodationsGrid;