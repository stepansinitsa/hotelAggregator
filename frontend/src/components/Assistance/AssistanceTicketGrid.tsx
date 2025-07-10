import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store-hooks";
import { assistanceApi } from "../../api/api-client";
import { FetchChatListParams } from "../../types/types.d";
import AssistanceTicketTable from "./AssistanceTicketTable";
import LoadingIndicator from "../Loader/LoadingIndicator";  

const AssistanceTicketGrid = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [tickets, setTickets] = useState<any>([]);

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const query: FetchChatListParams = {
          clientId: user.role === "client" ? user.id : null,
          isActive: true,
        };

        const result = await assistanceApi.fetchTickets(query);
        setTickets(result.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        iziToast.error({
          message: "Не удалось загрузить список обращений",
          position: "bottomCenter",
        });
      }
    };

    fetchTickets();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-center text-danger">Ошибка загрузки обращений</p>
      ) : (
        <AssistanceTicketTable tickets={tickets} />
      )}
    </>
  );
};

export default AssistanceTicketGrid;