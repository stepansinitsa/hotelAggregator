import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { setHotelsState } from "../../../store/lodgings/lodgingSlice";
import { LodgingAccomodationData } from "../../../types/types.d";
import HotelRoomsItem from "./AccommodationCard";

interface AccommodationTableProps {
  list: LodgingAccomodationData[];
}

function HotelRoomsItems({ list }: AccommodationTableProps) {
  const dispatch = useAppDispatch();
  const hotelsState = useAppSelector((state) => state.hotels);

  const handlePageChange = (direction: string) => {
    try {
      if (direction === 'plus') {
        dispatch(setHotelsState({ offset: hotelsState.offset + hotelsState.limit }));
      } else if (direction === 'minus') {
        dispatch(setHotelsState({ offset: Math.max(0, hotelsState.offset - hotelsState.limit) }));
      }
    } catch (e) {
      console.error("Ошибка при переходе по страницам", e);
    }
  };

  return (
    <>
      {list.length === 0 ? (
        <Container className="p-2 d-flex justify-content-center">
          <p>Нет доступных вариантов</p>
        </Container>
      ) : (
        <>
          {list.map((item) => (
            <HotelRoomsItem key={item._id} room={item} />
          ))}

          <Pagination className="mt-3 justify-content-center">
            {hotelsState.offset > 0 && (
              <Pagination.Item onClick={() => handlePageChange('minus')}>
                Назад
              </Pagination.Item>
            )}

            {list.length >= hotelsState.limit && (
              <Pagination.Item onClick={() => handlePageChange('plus')}>
                Следующая
              </Pagination.Item>
            )}
          </Pagination>
        </>
      )}
    </>
  );
}

export default HotelRoomsItems;