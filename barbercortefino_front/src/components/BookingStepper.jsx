export default function BookingStepper({ currentStep = 1 }) {
  const steps = [
    "Serviço",
    "Barbeiro",
    "Data",
    "Horário",
    "Confirmação",
  ];

  return (
    <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        return (
          <div
            key={step}
            className="flex items-center gap-2"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${
                  stepNumber <= currentStep
                    ? "bg-accent text-black"
                    : "bg-gray-700 text-white"
                }`}
            >
              {stepNumber}
            </div>

            <span className="text-sm">{step}</span>
          </div>
        );
      })}
    </div>
  );
}