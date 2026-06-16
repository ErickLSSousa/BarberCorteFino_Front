export default function TimeSlot({ time, available, selected, onSelect }) {
  return (
    <button
      onClick={() => available && onSelect(time)}
      disabled={!available}
      className={`p-3 rounded-lg text-center transition-all ${
        selected === time
          ? 'bg-accent text-dark font-semibold'
          : available
          ? 'bg-gray-900 hover:bg-gray-800'
          : 'bg-gray-900/50 text-gray-600 cursor-not-allowed line-through'
      }`}
      aria-disabled={!available}
    >
      {time}
    </button>
  );
}
