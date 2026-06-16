export default function CalendarPicker({
  value,
  onChange,
}) {
  return (
    <div className="w-full">
      <label className="block mb-2 font-medium">
        Escolha a Data
      </label>

      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
        className="w-full p-3 rounded-lg border border-gray-600 bg-dark text-white"
      />
    </div>
  );
}