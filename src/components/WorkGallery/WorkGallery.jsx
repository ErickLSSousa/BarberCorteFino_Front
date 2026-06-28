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
          response.data.works || response.data.portfolio || []
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

  const fallbackWorks = [
    { id: "fallback-1", title: "Degradê clássico", barber_name: "Corte Fino", image_url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80" },
    { id: "fallback-2", title: "Barba alinhada", barber_name: "Corte Fino", image_url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80" },
    { id: "fallback-3", title: "Corte social", barber_name: "Corte Fino", image_url: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=600&q=80" },
    { id: "fallback-4", title: "Razor fade", barber_name: "Corte Fino", image_url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" },
    { id: "fallback-5", title: "Acabamento fino", barber_name: "Corte Fino", image_url: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=600&q=80" },
    { id: "fallback-6", title: "Corte moderno", barber_name: "Corte Fino", image_url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80" },
  ];

  const galleryItems = works.length ? works : fallbackWorks;

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

          {galleryItems.map((work) => (
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