import { useEffect } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { lodgingSlice } from "../../../store/lodging/lodgingSlice";
import LodgingGrid from "./LodgingGrid";

function LodgingListPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(lodgingSlice({ offset: 0, title: "" }));
  }, []);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-3 mb-4">
        <Container>
          <Stack direction="horizontal" gap={3}>
            <h3 className="fs-5 fw-semibold">Объекты размещения</h3>
            {user.role === "admin" && (
              <Link to="/add-lodging" className="ms-auto">
                <Button variant="success">Добавить объект</Button>
              </Link>
            )}
          </Stack>
        </Container>
      </Container>
      <LodgingGrid />
    </>
  );
};

export default LodgingListPage;