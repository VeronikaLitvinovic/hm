import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";
import headerStyles from "./header.module.css";
import footerStyles from "./footer.module.css";
import { Container } from "@mui/material";

export default function Layout() {
  return (
    <Container>
      <header className={headerStyles.header}>
        <NavLink
          to="/albums"
          end={true}
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          Albums
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          Users
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
      <hr></hr>
      <footer className={footerStyles.footer}>
        <p>Created by: Litvinovich Veronika</p>
        <p>BSU: 2023</p>
      </footer>
    </Container>
  );
}
