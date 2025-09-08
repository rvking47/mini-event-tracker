import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FcFlashAuto } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";

const Navbars = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        expanded={expanded}
        className="shadow-sm w-100"
      >
        <Container fluid>
          {/* Brand */}
          <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
            <FcFlashAuto className="fs-2" />
            <span className="fw-bold fs-4 text-black">Mini Event Tracker</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
