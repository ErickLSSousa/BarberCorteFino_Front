import { Link } from "react-router-dom";
import "./BackHomeButton.css";

export default function BackHomeButton({ className = "" }) {
  return (
    <Link to="/" className={`back-home-button ${className}`.trim()}>
      ← Voltar para Home
    </Link>
  );
}
