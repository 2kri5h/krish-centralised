import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// The header and footer share the homepage design system (fonts, palette, layout).
import "../../pages/Home.css";

export const SARC_CALENDAR = "https://gymkhana.iitb.ac.in/instiapp//org/sarc";

function NavItem({ item, pathname, onClick }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" onClick={onClick}>
        {item.label}
      </a>
    );
  }
  if (item.href) {
    return (
      <a href={item.href} onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link
      to={item.to}
      onClick={onClick}
      aria-current={pathname === item.to ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

export default function SiteHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const isHome = pathname === "/";

  // On the homepage About and Programs scroll within the page; elsewhere they go to their pages.
  const links = [
    isHome
      ? { label: "About", href: "#about" }
      : { label: "About", to: "/aboutUs" },
    isHome
      ? { label: "Programs", href: "#programs" }
      : { label: "Programs", to: "/initiatives" },
    { label: "Events", href: SARC_CALENDAR, external: true },
    { label: "Gallery", to: "/gallery" },
    { label: "Alumni advice", to: "/alumni-advice" },
  ];

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  const authItems = isAuthenticated ? (
    <>
      <Link
        to="/profile"
        onClick={closeMenu}
        aria-current={pathname === "/profile" ? "page" : undefined}
      >
        Profile
      </Link>
      <button type="button" className="home-nav-button" onClick={handleLogout}>
        Log out
      </button>
    </>
  ) : (
    <Link
      to="/login"
      onClick={closeMenu}
      aria-current={pathname === "/login" ? "page" : undefined}
    >
      Log in
    </Link>
  );

  return (
    <div className="sarc-home site-chrome site-header" id="top">
      <a className="home-skip" href="#content">
        Skip to content
      </a>
      <header className="home-header home-container">
        <Link
          className="home-brand"
          to="/"
          aria-label="SARC, IIT Bombay home"
          onClick={closeMenu}
        >
          <span className="home-logo" aria-hidden="true" />
        </Link>
        <nav className="home-desktop-nav" aria-label="Main navigation">
          {links.map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
          {authItems}
          <Link className="home-nav-contact" to="/contact">
            Get in touch
          </Link>
        </nav>
        <button
          ref={menuButton}
          className="home-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="home-mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>
      <nav
        className={`home-mobile-nav ${menuOpen ? "is-open" : ""}`}
        id="home-mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {links.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            pathname={pathname}
            onClick={closeMenu}
          />
        ))}
        {authItems}
        <Link to="/contact" onClick={closeMenu}>
          Get in touch
        </Link>
      </nav>
    </div>
  );
}
