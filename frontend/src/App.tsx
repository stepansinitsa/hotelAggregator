import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useAppDispatch } from "./store/store-hooks";
import { login, logout } from "./store/user/accountSlice";
import WebSocketClient from "./socket/WebSocketClient";
import onSocketEvent from "./hooks/onSocketEvent";
import onWebSocketSubscription from "./hooks/useWebSocketSubscription";
import NavigationMenu from "./components/Menu/NavigationMenu";
import { useAuthentication } from "./hooks/useAuthentication";
import { accountApi } from "./api/api-client";
import LodgingDetailsPage from "./components/Lodging/LodgingDetailsPage/LodgingDetailsPage";
import LodgingListPage from "./components/Lodging/LodgingList/LodgingListPage";
import LodgingCreatePage from "./components/Lodging/LodgingAdd/LodgingCreatePage";
import LodgingEditPage from "./components/Lodging/LodgingUpdate/LodgingEditPage";
import AccommodationCreatePage from "./components/Lodging/Accommodations/AccommodationCreatePage";
import AccommodationEditPage from "./components/Lodging/Accommodations/AccommodationEditPage";
import UserAccountListPage from "./components/Users/UserAccountListPage";
import BookingHistoryPage from "./components/Booking/BookingHistoryPage";
import AssistanceDashboard from "./components/Assistance/AssistanceDashboard";
import TicketChat from "./components/Assistance/TicketChat";
import NotFoundPage from "./components/Error/NotFoundPage";

function Routing() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAuthentication();

  const handleNewMessage = (dto: any) => {
    console.log("Новое сообщение:", dto);
  };

  onSocketEvent("newMessage", handleNewMessage);
  onSocketEvent("subscribeToChat", handleNewMessage);
  onWebSocketSubscription();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    try {
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split("")
          .map((c) =>
            "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
          )
          .join("")
          .replace(/\+/g, " ")
      );
      const { email } = JSON.parse(jsonPayload);

      if (email) {
        accountApi.fetchProfile(email).then((data) => {
          dispatch(login({ ...data }));
        });
      }
    } catch (error) {
      dispatch(logout());
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Row>
          <Col sm={3}>
            <NavigationMenu />
          </Col>
          <Col sm={9}>
            <Routes>
              <Route path="/" element={<LodgingDetailsPage />} />
              <Route path="/hotels" element={<LodgingListPage />} />
              <Route path="/add-lodging" element={<LodgingCreatePage />} />
              <Route path="/edit-lodging" element={<LodgingEditPage />} />
              <Route path="/add-accommodation" element={<AccommodationCreatePage />} />
              <Route path="/edit-accommodation" element={<AccommodationEditPage />} />
              <Route path="/profile" element={<UserAccountListPage />} />
              <Route path="/bookings" element={<BookingHistoryPage />} />
              <Route path="/support" element={<AssistanceDashboard />} />
              <Route path="/chat" element={<TicketChat />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default Routing;