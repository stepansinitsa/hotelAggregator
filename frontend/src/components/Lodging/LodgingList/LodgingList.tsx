import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { fetchLodgings } from "../../../store/lodging/lodgingSlice";
import { Lodging } from "../../../types/types.d";
import LodgingCard from "./LodgingCard";

interface LodgingListProps {
  list: Lodging[];
}

function LodgingList({ list }: LodgingListProps) {
  const { limit, offset, titleSearch } = useAppSelector((state) => state.lodging);
  const dispatch = useAppDispatch();

  const handleNextPage = (direction: "prev" | "next") => {
    if (direction === "next") {
      dispatch(fetchLodgings({ offset: offset + limit, title: titleSearch }));
    } else {
      dispatch(fetchLodgings({ offset: Math.max(0, offset - limit), title: titleSearch }));
    }
  };

  return (
    <>
      {list.length === 0 ? (
        <Container className="p-3 d-flex justify-content-center">
          <span>Нет доступных объектов размещения</span>
        </Container>
      ) : (
        <>
          {list.map((item) => (
            <LodgingCard key={item._id} lodging={item} showBtn={true} />
          ))}
          <Pagination className="mt-3 justify-content-center">
            {offset > 0 && (
              <Pagination.Item onClick={() => handleNextPage("prev")}>
                Предыдущая
              </Pagination.Item>
            )}
            {list.length >= limit && (
              <Pagination.Item onClick={() => handleNextPage("next")}>
                Следующая
              </Pagination.Item>
            )}
          </Pagination>
        </>
      )}
    </>
  );
};

export default LodgingList;