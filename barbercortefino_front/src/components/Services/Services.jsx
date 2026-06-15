import "./Services.css";

export default function Services({ services }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <h2>Serviços</h2>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <h3>{service.name}</h3>

              <span>{service.duration_minutes} min</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
