import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-dark min-h-[70vh] flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Barbearia <span className="text-accent">Corte Fino</span>
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Estilo, tradição e atendimento de qualidade.
          Agende seu horário online com praticidade e sem filas.
        </p>

        <Link
          to="/agendar"
          className="bg-accent text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Agendar Agora
        </Link>
      </div>
    </section>
  );
}