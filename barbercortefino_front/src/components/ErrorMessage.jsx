export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
      <p className="font-medium">Erro:</p>
      <p>{message}</p>
    </div>
  );
}
