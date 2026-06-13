export default function ServiceCard({ service }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{service.name}</h3>

      <p>
        Duração: {service.duration_minutes} minutos
      </p>

      <p>
        Preço: R$ {(service.price_cents / 100).toFixed(2)}
      </p>
    </div>
  );
}