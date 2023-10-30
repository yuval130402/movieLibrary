import { Container, Nav, Dropdown, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Urls } from "../utilities/Constants";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { clearSearch } from "../features/search/searchSlice";

interface NavBarProps {
  children?: React.ReactNode;
}

export function Navbar({children}: NavBarProps ) {
  const dispatch = useAppDispatch();
  return (
    <NavbarBs sticky="top" className="shadow-lg mb-3 fixed-top" style={{backgroundColor: "lightgray"}}>
      <Container fluid>
        <Nav className="me-auto">
          <NavbarBs.Brand className="px-2" as={NavLink} to={Urls.Home} onClick={() => dispatch(clearSearch())}>
            <b>
            Movies Library
            </b>
          </NavbarBs.Brand>
          
          <Nav.Link to={Urls.Home} as={NavLink} onClick={() => dispatch(clearSearch())}>
            Popular
          </Nav.Link>
          <Nav.Link to={Urls.NowPlaying} as={NavLink} onClick={() => dispatch(clearSearch())}>
            Now Playing
          </Nav.Link>
          <Nav.Link to={Urls.Favorites} as={NavLink} onClick={() => dispatch(clearSearch())}>
            Favorites
          </Nav.Link>
        </Nav>
        <div className="flex justify-end px-2">{children}</div>
      </Container>
    </NavbarBs>
  );
}
