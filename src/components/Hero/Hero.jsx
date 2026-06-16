import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div>
          <span className="hero-badge">Barbearia Premium</span>

          <h1>Seu estilo merece um corte impecável.</h1>

          <p>
            Experiência premium, barbeiros especializados e atendimento de alto
            nível.
          </p>
          <Link to="/agendar" className="hero-button">
            Agendar Agora
          </Link>
        </div>
      </div>
    </section>
  );
}
