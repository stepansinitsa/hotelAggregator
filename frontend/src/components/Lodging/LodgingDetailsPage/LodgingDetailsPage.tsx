import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetchData from "../../../api/api-client";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { setHotelsState } from "../../../store/lodgings/lodgingSlice";
import LoaderMain from "../../Loader/LoadingIndicator";
import HotelsListItem from "../LodgingList/LodgingItem";
import AccommodationList from "../Accommodations/AccommodationList";

function HotelPageMain() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const role = useAppSelector((state) => state.user.role);
  const hotelsState = useAppSelector((state) => state.hotels);
  const { hotelsAPI } = useFetchData();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryParams = new URLSearchParams(location.search);

  const hotelId = queryParams.get("id");

  useEffect(() => {
    if (!hotelId) {
      navigate("/error");
      return;
    }

    setError(false);
    setLoading(true);

    hotelsAPI.findById(hotelId)
      .then((result) => {
        dispatch(setHotelsState({ currentHotel: result.data }));
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
  }, []);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-3 mb-3">
        <Row className="align-items-center">
          <Col>
            <h3 className="fs-5 fw-semibold">Информация об объекте размещения</h3>
          </Col>
          {role === 'admin' && (
            <Col xs="auto">
              <Link to={`/update-hotel?id=${hotelId}`}>
                <Button variant="warning" className="me-1 mb-2">
                  Редактировать
                </Button>
              </Link>
            </Col>
          )}
        </Row>
      </Container>

      {loading ? (
        <LoaderMain />
      ) : error ? (
        <p className="text-center text-danger mt-3">Ошибка загрузки данных</p>
      ) : (
        <>
          <HotelsListItem hotel={hotelsState.currentHotel} showBtn={false} />
          {role === "admin" && (
            <Link to={`/add-room?${hotelsState.currentHotel._id}`} className="ms-auto text-decoration-none">
              <div className="d-grid gap-2 mb-3">
                <Button variant="success" size="lg">
                  Добавить номер
                </Button>
              </div>
            </Link>
          )}
          <AccommodationList />
        </>
      )}
    </>
  );
}

export default HotelPageMain;