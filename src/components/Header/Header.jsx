import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">

        <Link to="/" className="logo">
          Corte Fino
        </Link>

        <nav>
          <ul className="nav-links">

            <li>
              <Link to="/">
                Início
              </Link>
            </li>

            <li>
              <a href="#services">
                Serviços
              </a>
            </li>

            <li>
              <Link to="/agendar">
                Agendar
              </Link>
            </li>

            <li>
              <Link to="/login">
                Login Cliente
              </Link>
            </li>

          <li>
              <Link to="/admin/login">
                Admin
              </Link>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
}