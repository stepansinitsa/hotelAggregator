import { useEffect } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { setHotelsState } from "../../../store/lodgings/lodgingSlice";
import HotelsList from "./LodgingItem";

function HotelsListMain() {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.user.role);

  useEffect(() => {
    dispatch(setHotelsState({ offset: 0, titleSearch: "" }));
  }, []);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-3 mb-4">
        <Container>
          <Stack direction="horizontal" gap={3}>
            <h3 className="fs-5 fw-semibold">Все объекты размещения</h3>
            {role === 'admin' && (
              <Link to="/add-hotel" className="ms-auto">
                <Button variant="success">Добавить отель</Button>
              </Link>
            )}
          </Stack>
        </Container>
      </Container>

      <HotelsList hotel={{
        _id: '',
        title: '',
        description: '',
        images: []
      }} showBtn={true} />
    </>
  );
}

export default HotelsListMain;