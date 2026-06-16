import { useEffect, useState } from "react";
import { portfolioAPI } from "../../services/portfolioAPI";

import "./WorkGallery.css";

export default function WorkGallery() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorks() {
      try {
        const response =
          await portfolioAPI.getAll();

        setWorks(
          response.data.works || []
        );
      } catch (error) {
        console.error(
          "Erro ao carregar galeria",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadWorks();
  }, []);

  if (loading) {
    return (
      <section className="gallery-section">
        <div className="container">
          <h2>Carregando galeria...</h2>
        </div>
      </section>
    );
  }

  return (
    <section
      className="gallery-section"
      id="gallery"
    >
      <div className="container">

        <div className="section-header">
          <span>Portfólio</span>

          <h2>
            Trabalhos Recentes
          </h2>
        </div>

        <div className="gallery-grid">

          {works.map((work) => (
            <article
              key={work.id}
              className="gallery-card"
            >
              <img
                src={work.image_url}
                alt={work.title}
              />

              <div className="gallery-overlay">

                <h3>
                  {work.title}
                </h3>

                <span>
                  Corte por:
                  {" "}
                  {work.barber_name}
                </span>

              </div>

            </article>
          ))}

        </div>
      </div>
    </section>
  );
}