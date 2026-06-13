import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import { servicesAPI } from "../services/api";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await servicesAPI.getAll();


        console.log(res.data);

        setServices(res.data.services || []);
      } catch (err) {
        // Dados mockados caso API falhe ou não exista ainda
        setServices([
          {
            id: 1,
            name: "Corte Social",
            description: "O clássico bem feito. Inclui lavagem e finalização.",
            price: 45.0,
            duration: 30,
          },
          {
            id: 2,
            name: "Barba Completa",
            description: "Toalha quente, óleos essenciais e contorno perfeito.",
            price: 35.0,
            duration: 30,
          },
          {
            id: 3,
            name: "Combo Corte Fino",
            description: "Corte + Barba + Sobrancelha com desconto.",
            price: 70.0,
            duration: 60,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <Hero />

      {/* Seção Serviços */}
      <section className="py-16 bg-dark/95">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossos Serviços
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={() => {}}
                selected={false}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/agendar" className="btn-accent text-lg">
              Agendar Meu Horário
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Sobre a Corte Fino</h2>
          <p className="text-gray-300 mb-4">
            Estabeleça seu novo visual com os melhores profissionais da região.
            Do corte tradicional à barba desenhada, oferecemos o mais alto nível
            de atendimento em barbearia.
          </p>
          <p className="text-gray-300">
            Ambiente climatizado, atendimento com hora marcada e produtos de
            alta qualidade para cuidar do seu visual.
          </p>
        </div>
      </section>
    </div>
  );
}
