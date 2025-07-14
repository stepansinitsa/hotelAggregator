import iziToast from "izitoast";
import { useEffect, useState } from "react";
import useFetchData from "../../api/api-client";
import { useAppSelector } from "../../store/store-hooks";
import { GetTicketListParams } from "../../types/types.d";
import LoaderMain from "../Loader/LoadingIndicator";
import SupportTable from "./AssistanceDashboard";

function SupportList() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<any>([]);
  const user = useAppSelector(state => state.user);
  const { supportRequestApi } = useFetchData();

  useEffect(() => {
    setError(false);
    setLoading(true);

    const query: GetTicketListParams = {
      userId: user.id,
      isActive: true,
    }

    if (user.role === 'manager' || user.role === 'admin') {
      query.userId = null;
    }

    supportRequestApi.findRequests(query)
      .then(result => {  
        setList(result.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
          position: 'bottomCenter',
        });
      });
  }, []);

  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Ошибка загрузки обращений!</p>
        ) : (
          <SupportTable list={list} />
        )
      )}
    </>
  )
}

export default SupportList;
