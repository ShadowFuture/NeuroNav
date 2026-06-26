import React from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/task-breaker", label: "Task Breaker" },
  { to: "/focus-mode", label: "Focus Mode" },
  { to: "/calm-corner", label: "Calm Corner" },
  { to: "/camera-bubble", label: "Camera Bubble" },
];

const Navbar = () => (
  <nav
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 1.25rem",
      background: "#ffffff",
      borderBottom: "1px solid rgba(108, 124, 255, 0.16)",
      flexWrap: "wrap",
      gap: "0.75rem",
    }}
  >
    <Link to="/" style={{ textDecoration: "none", color: "#16233b", fontWeight: 700 }}>
      NeuroNav
    </Link>

    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          style={{ textDecoration: "none", color: "#5b6d89", fontWeight: 600 }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  </nav>
);

export default Navbar;
