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
  const user = useAppSelector((state) => state.user);
  const { supportRequestApi } = useFetchData();

  useEffect(() => {
    if (!user.id) return;

    setError(false);
    setLoading(true);

    const query: GetTicketListParams = {
      userId: user.role === 'client' ? user.id : null,
      isActive: true,
    };

    supportRequestApi.findRequests(query)
      .then((result: { data: any[] }) => {
        setList(result.data || []);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(true);
        iziToast.error({
          message: err?.response?.data?.message || "Ошибка при загрузке обращений",
          position: "bottomCenter",
        });
      });
  }, []);

  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : error ? (
        <p className="text-center text-danger mt-3">Ошибка загрузки данных</p>
      ) : list.length === 0 ? (
        <p className="text-center text-muted mt-3">Нет активных обращений</p>
      ) : (
        <SupportTable list={list} />
      )}
    </>
  );
}

export default SupportList;