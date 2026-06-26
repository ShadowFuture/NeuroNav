import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <div style={{ minHeight: "100vh", background: "#f6f8ff" }}>
    <Navbar />
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem 1rem 2rem" }}>
      {children}
    </main>
  </div>
);

export default Layout;
