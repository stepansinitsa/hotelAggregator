import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import ChatNotificationHandler from "./ChatNotificationHandler";

function AppHeader() {
  return (
    <Container>
      <Navbar bg="white" expand="lg" className="mt-3 mb-4 shadow-sm rounded">
        <Container>
          <Link to="/" className="navbar-brand fw-bold text-uppercase">
            <img src="/hotel-logo.png" alt="LodgingHub" />
            LodgingHub
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <ChatNotificationHandler />
            <AuthContainer />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default AppHeader;