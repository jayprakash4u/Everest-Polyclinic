function GenericTiming({ timing }) {
  if (!timing) return null;
  return (
    <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 border border-slate-200">
      <span className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></span>
      <span className="font-bold text-slate-800">{timing.main}</span>
      {timing.sub && <span className="text-slate-500">{timing.sub}</span>}
    </div>
  );
}

export default GenericTiming;