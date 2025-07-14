import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { setHotelsState } from "../../../store/lodgings/lodgingSlice";
import { LodgingData } from "../../../types/types.d";
import HotelsListItem from "./LodgingListPage";

interface propData {
  list: LodgingData[],
}

function HotelsListItems(data: propData) {
  const hotelsState = useAppSelector(state => state.hotels);
  const dispatch = useAppDispatch();
  const { list } = data;

  const handleNextPage = async (data: string) => {
    try {
      if (data === 'plus') {
        dispatch(setHotelsState({ offset: hotelsState.offset + hotelsState.limit }));
      } else if (data === 'minus') {
        dispatch(setHotelsState({ offset: hotelsState.offset - hotelsState.limit }));
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      {list.length === 0 ? (
        <Container className="p-2 d-flex justify-content-center">
          <span>Нет данных!</span>
        </Container>
      ) : (
        <>
          {list.map(elem =>
            <HotelsListItem key={elem._id} hotel={elem} showBtn={true} />
          )}
          <Pagination className="mt-3">
            {hotelsState.offset > 0 && 
              <Pagination.Item onClick={() => handleNextPage('minus')}>
                Назад
              </Pagination.Item>
            }
            {hotelsState.list.length >= hotelsState.limit && 
              <Pagination.Item onClick={() => handleNextPage('plus')}>
                Дальше
              </Pagination.Item>
            }
          </Pagination>
        </>
        
      )}
      
    </>
  )
}

export default HotelsListItems