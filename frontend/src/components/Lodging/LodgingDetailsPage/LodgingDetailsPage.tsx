import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { lodgingApi } from "../../../api/api-client";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { updateCurrentLodging } from "../../../store/lodging/lodgingSlice";
import LoadingIndicator from "../../Loader/LoadingIndicator";
import AccommodationList from "../Accommodations/AccommodationList";
import LodgingCard from "../LodgingList/LodgingCard";

const LodgingDetailsPage = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user);
  const currentLodging = useAppSelector((state) => state.lodging.currentLodging);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);
    setLoading(true);

    const lodgingId = queryParams.get("id");
    if (!lodgingId) {
      navigate("/not-found");
      return;
    }

    lodgingApi.getById(lodgingId)
      .then((result) => {
        dispatch(updateCurrentLodging(result));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        iziToast.error({
          message: "Не удалось загрузить данные отеля",
          position: "bottomCenter",
        });
      });
  }, []);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-3 mb-4">
        <Container>
          <h2 className="fs-5 fw-semibold">Детали жилья</h2>
          <p className="text-muted">ID: {currentLodging._id}</p>
          {user.role === "admin" && (
            <Link to={`/update-lodging?id=${currentLodging._id}`}>
              <Button variant="warning" className="me-2 mb-2">
                Редактировать
              </Button>
            </Link>
          )}
        </Container>
      </Container>

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-center text-danger">Не удалось загрузить данные</p>
      ) : (
        <>
          <LodgingCard lodging={currentLodging} showBtn={false} />
          {user.role === "admin" && (
            <Link
              to={`/add-accommodation?lodgingId=${currentLodging._id}`}
              className="ms-auto text-decoration-none"
            >
              <div className="d-grid gap-2 mb-3">
                <Button variant="success">Добавить номер</Button>
              </div>
            </Link>
          )}
          <AccommodationList />
        </>
      )}
    </>
  );
};

export default LodgingDetailsPage;