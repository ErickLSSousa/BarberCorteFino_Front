export default function BarberSelect({ barbers, selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {barbers.map((barber) => (
        <button
          key={barber.id}
          onClick={() => barber.available && onSelect(barber)}
          disabled={!barber.available}
          className={`card p-4 text-left transition-all ${
            selected?.id === barber.id
              ? 'border-accent ring-2 ring-accent/20'
              : !barber.available
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:border-gray-700'
          }`}
          aria-disabled={!barber.available}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
              <img 
                src={barber.avatar || '/imagens/barber-default.png'} 
                alt={`Barbeiro ${barber.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{barber.name}</h3>
              <p className="text-sm text-gray-400">{barber.specialty}</p>
              {!barber.available && (
                <span className="text-xs text-red-400 font-medium">Indisponível</span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
