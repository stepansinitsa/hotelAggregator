import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { fetchLodgings } from "../../../store/lodging/lodgingSlice";
import { useNavigate } from "react-router-dom";
import LodgingCard from "./LodgingCard";
import LoadingIndicator from "../../Loader/LoadingIndicator";

function LodgingGrid() {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const lodgings = useAppSelector((state) => state.lodging.list);
  const loading = useAppSelector((state) => state.lodging.loading);
  const { limit, offset, titleSearch } = useAppSelector((state) => state.lodging);

  useEffect(() => {
    setError(false);
    dispatch(fetchLodgings({ limit, offset, title: titleSearch }));
  }, [offset, titleSearch]);

  const handleNextPage = (direction: "prev" | "next") => {
    if (direction === "next") {
      dispatch(fetchLodgings({ offset: offset + limit, title: titleSearch }));
    } else {
      dispatch(fetchLodgings({ offset: Math.max(0, offset - limit), title: titleSearch }));
    }
  };

  if (loading && !lodgings.length) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {error ? (
        <p className="text-center text-danger">Не удалось загрузить список жилья</p>
      ) : (
        <>
          {lodgings.length === 0 ? (
            <Container className="p-3 text-center">
              <p>Доступные варианты жилья не найдены</p>
            </Container>
          ) : (
            <>
              {lodgings.map((item) => (
                <LodgingCard key={item._id} lodging={item} showBtn={true} />
              ))}

              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  {offset > 0 && (
                    <Pagination.Item onClick={() => handleNextPage("prev")}>
                      Назад
                    </Pagination.Item>
                  )}
                  {lodgings.length >= limit && (
                    <Pagination.Item onClick={() => handleNextPage("next")}>
                      Следующая
                    </Pagination.Item>
                  )}
                </Pagination>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default LodgingGrid;