function AmbulanceTiming({ timing }) {
  if (!timing) return null;
  return (
    <div className="bg-blue-600 p-6 rounded-xl text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-xl font-bold">{timing.main}</span>
        </div>
        <div className="text-right">
          <p className="text-blue-200 text-sm">Hotline</p>
          <p className="text-2xl font-bold">{timing.hotline}</p>
        </div>
      </div>
    </div>
  );
}

export default AmbulanceTiming;