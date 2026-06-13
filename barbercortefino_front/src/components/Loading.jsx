export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400">Carregando...</p>
    </div>
  );
}
