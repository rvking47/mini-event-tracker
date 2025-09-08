import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MDBIcon, MDBBtn, MDBTooltip } from "mdb-react-ui-kit";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const toggle = () => setCollapsed(!collapsed);
  const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.loading("User Logout..", { duration: 2000 });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };


  // auto collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);   
      } else {
        setCollapsed(false); 
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  const items = [
    { label: "Dashboard", path: "/", icon: "home" },
    { label: "Events", path: "/allevents", icon: "calendar-alt" },
    { label: "Create Event", path: "/createevents", icon: "plus-circle" },
    { label: "Logout", icon: "sign-out-alt",  onClick: handleLogout  },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserEmail(parsedUser.email);
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
      }
    }
  }, []);

  return (
    <>
          <Toaster />
    <aside
      className={`d-flex flex-column bg-light border-end vh-100 p-3 position-fixed ${
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      }`}
      style={{ width: collapsed ? 80 : 240, transition: "width .2s ease" }}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        {!collapsed && <h6 className="mb-0">MenuBar</h6>}
        <MDBBtn size="sm" color="link" onClick={toggle}>
          <MDBIcon fas icon={collapsed ? "angle-right" : "angle-left"} />
        </MDBBtn>
      </div>

<nav className="flex-grow-1">
  {items.map((it) => {
    // If the item has an onClick handler (like Logout)
    if (it.onClick) {
      return (
        <div
          key={it.label}
          onClick={it.onClick}
          className="d-flex align-items-center gap-3 mb-2 p-2 rounded text-dark"
          style={{ cursor: "pointer", whiteSpace: "nowrap" }}
        >
          <span style={{ width: 28, textAlign: "center" }}>
            <MDBIcon fas icon={it.icon} />
          </span>
          {!collapsed && <span className="fw-medium">{it.label}</span>}
        </div>
      );
    }

    // Default NavLink for normal navigation items
    return (
      <NavLink
        key={it.label}
        to={it.path}
        className={({ isActive }) =>
          `d-flex align-items-center gap-3 mb-2 text-decoration-none p-2 rounded ${
            isActive ? "bg-primary text-white" : "text-dark"
          }`
        }
        style={{ whiteSpace: "nowrap" }}
      >
        <span style={{ width: 28, textAlign: "center" }}>
          <MDBIcon fas icon={it.icon} />
        </span>
        {!collapsed && <span className="fw-medium">{it.label}</span>}
      </NavLink>
    );
  })}
</nav>


    <div className="mt-auto d-flex align-items-center gap-2 small text-muted">
    <FaUserCircle className="text-amber-400 fs-4" />
    {!collapsed && <span className="text-black">{userEmail}</span>}
  </div>
    </aside>
    </>
  );
};

export default Sidebar;
