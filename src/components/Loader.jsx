export default function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0f0f0f]">

      <div className="flex flex-col items-center gap-4">

        {/* SHIMMER BAR */}
        <div className="relative w-40 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent animate-shimmer" />
        </div>

        {/* TEXT */}
        <p className="text-white/60 text-sm tracking-widest">
          loading collection...
        </p>

      </div>

    </div>
  );
}