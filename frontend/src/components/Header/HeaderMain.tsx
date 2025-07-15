import { Navbar, Container, OverlayTrigger, Popover, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAuth from "./AppHeader";
import TicketNotificationHandler from "./TicketNotificationHandler";

function HeaderMain() {
  return (
    <Container fluid>
      <Navbar bg="white" expand="lg" className="mt-3 mb-4 shadow-sm rounded">
        <Container>
          <Link to="/" className="navbar-brand fw-bold text-uppercase">
            <img src="../src/assets/img/booking.png" alt="Сайт бронирования отелей" width="30" height="30" className="me-2" />
            Сервис бронирования отелей
          </Link>
          <Navbar.Toggle aria-controls="user-nav" />
          <Navbar.Collapse className="justify-content-end">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose
              overlay={
                <Popover>
                  <Popover.Header as="h3">Вход / Регистрация</Popover.Header>
                  <Popover.Body>
                    <HeaderAuth />
                  </Popover.Body>
                </Popover>
              }
            >
              <Button variant="outline-primary">Аккаунт</Button>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <TicketNotificationHandler />
    </Container>
  );
}

export default HeaderMain;