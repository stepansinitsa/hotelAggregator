import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { setHotelsState } from "../../../store/lodgings/lodgingSlice";
import { LodgingData } from "../../../types/types.d";
import HotelsListItem from "./LodgingItem";

interface LodgingListProps {
  list: LodgingData[];
}

function HotelsListItems({ list }: LodgingListProps) {
  const hotelsState = useAppSelector((state) => state.hotels);
  const dispatch = useAppDispatch();

  const handlePageChange = (direction: string) => {
    try {
      if (direction === "plus") {
        dispatch(setHotelsState({ offset: hotelsState.offset + hotelsState.limit }));
      } else if (direction === "minus") {
        dispatch(setHotelsState({ offset: Math.max(0, hotelsState.offset - hotelsState.limit) }));
      }
    } catch (error) {
      console.error("Ошибка при переходе между страницами:", error);
    }
  };

  return (
    <>
      {list.length === 0 ? (
        <Container className="p-2 d-flex justify-content-center">
          <p className="text-muted">Нет доступных отелей</p>
        </Container>
      ) : (
        <>
          {list.map((item) => (
            <HotelsListItem key={item._id} hotel={item} showBtn />
          ))}

          <Pagination className="mt-3 justify-content-center">
            {hotelsState.offset > 0 && (
              <Pagination.Item onClick={() => handlePageChange("minus")}>
                Назад
              </Pagination.Item>
            )}

            {list.length >= hotelsState.limit && (
              <Pagination.Item onClick={() => handlePageChange("plus")}>
                Следующая
              </Pagination.Item>
            )}
          </Pagination>
        </>
      )}
    </>
  );
}

export default HotelsListItems;