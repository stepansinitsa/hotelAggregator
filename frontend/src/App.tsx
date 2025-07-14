import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import useFetchData from "./api/api-client";
import ChatMain from "./components/Ticket/TicketMain";
import ErrorMain from "./components/Error/NotFoundPage";
import HeaderMain from "./components/Header/AuthContainer";
import HotelPageMain from "./components/Lodging/LodgingDetailsPage/LodgingDetailsPage";
import HotelRoomUpdateMain from "./components/Lodging/AccommodationsUpdate/AccommodationEditPage";
import HotelsAdd from "./components/Lodging/LodgingAdd/LodgingCreatePage";
import HotelsListMain from "./components/Lodging/LodgingList/LodgingPage";
import HotelsRoomsAddMain from "./components/Lodging/AccommodationsAdd/AccommodationCreatePage";
import HotelsSearch from "./components/Lodging/LodgingSearch/LodgingSearchMain";
import HotelsUpdateMain from "./components/Lodging/LodgingUpdate/LodgingEditPage";
import MenuMain from "./components/Menu/NavigationMenu";
import ReservationsForm from "./components/Bookings/BookingCreateForm";
import ReservationsMain from "./components/Bookings/BookingGrid";
import SupportMain from "./components/Support/AssistanceTicketGrid";
import UsersMain from "./components/Users/UserPage";
import { getToken } from "./helpers/auth-storage.helpers";
import { SocketClient } from "./socket/WebSocketClient";
import { useAppDispatch } from "./store/store-hooks";
import { login, logout } from "./store/user/userSlice";

function App() {
  SocketClient();
  const dispatch = useAppDispatch();
  const { authUser } = useFetchData();

  const checkAuth = async () => {
    const token = getToken();

    try {
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const { email } = JSON.parse(jsonPayload);
        authUser.getInfo(email)
          .then(result => {
            dispatch(login({ token, role: result.data.role, id: result.data.id }));
          })
          .catch(() => {
            dispatch(logout());
          })
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <BrowserRouter>
      <HeaderMain />
      <Container>
        <Row>
          <Col sm={3}>
            <MenuMain />
          </Col>
          <Col sm={9}>
            <Routes>
              <Route path="/" element={<HotelsSearch />} />
              <Route path="/all-hotels" element={<HotelsListMain />} />
              <Route path="/add-hotel" element={<HotelsAdd />} />
              <Route path="/update-hotel" element={<HotelsUpdateMain />} />
              <Route path="/add-room" element={<HotelsRoomsAddMain />} />
              <Route path="/update-room" element={<HotelRoomUpdateMain />} />
              <Route path="/users" element={<UsersMain />} />
              <Route path="/hotel" element={<HotelPageMain />} />
              <Route path="/reservations" element={<ReservationsMain />} />
              <Route path="/reserve-room" element={<ReservationsForm />} />
              <Route path="/requests" element={<SupportMain />} />
              <Route path="/chat" element={<ChatMain />} />
              <Route path="*" element={<ErrorMain />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  )
}

export default App
