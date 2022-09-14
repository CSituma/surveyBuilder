import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
//import { useUserContextWrapper } from "../Context/UserContextWrapper";
import { useEffect, useState } from "react";

import { Nav } from "react-bootstrap";
import { menuItem } from "../../utils/Menuitems";
import { useNavigate } from "react-router-dom";
function NavbarComponent() {
  const [user, setuser] = useState("");
  const navigate = useNavigate();
  //const loggedInUser = useUserContextWrapper();

  useEffect(() => {
    const userdata = localStorage.getItem("User");
    setuser(userdata);
  }, []);

  function logout() {

    localStorage.clear();
    return navigate("/");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">JebenaLogo</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {menuItem.map((Item, index) => (
            <Nav className="me-auto" id="navbarItems" key={index}>
              <Nav.Link href={Item.path} className="text-white">
                {Item.name}
              </Nav.Link>
            </Nav>
          ))}

          <Navbar.Brand href="/" onClick={logout}>
            Logout {user}
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
