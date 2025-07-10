import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { setLodgingState } from "../../../store/lodging/lodgingSlice";
import AccommodationCard from "./AccommodationCard";
import { AccommodationDetails } from "../../../types/types";

interface AccommodationListProps {
  list: AccommodationDetails[];
}

const AccommodationList = ({ list }: AccommodationListProps) => {
  const state = useAppSelector((state) => state.accommodations);
  const dispatch = useAppDispatch();

  const handlePageChange = (direction: 'prev' | 'next') => {
    try {
      if (direction === 'next') {
        dispatch(setLodgingState({ offset: state.offset + state.limit }));
      } else {
        dispatch(setLodgingState({ offset: Math.max(0, state.offset - state.limit) }));
      }
    } catch (error) {
      console.error("Ошибка при смене страницы:", error);
    }
  };

  return (
    <>
      {list.length === 0 ? (
        <Container className="p-3 d-flex justify-content-center">
          <span>Нет доступных номеров</span>
        </Container>
      ) : (
        <>
          {list.map((item) => (
            <AccommodationCard key={item._id} accommodation={item} />
          ))}

          <Pagination className="mt-3 justify-content-center">
            {state.offset > 0 && (
              <Pagination.Item onClick={() => handlePageChange('prev')}>
                Назад
              </Pagination.Item>
            )}
            {list.length >= state.limit && (
              <Pagination.Item onClick={() => handlePageChange('next')}>
                Следующая
              </Pagination.Item>
            )}
          </Pagination>
        </>
      )}
    </>
  );
};

export default AccommodationList;