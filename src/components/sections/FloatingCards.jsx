import { STATS } from "@/constants";

export default function FloatingCards() {
  return (
    <section className="relative -mt-48 z-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-primary-600 text-white text-center py-6 px-4 shadow-lg rounded-tl-3xl rounded-br-3xl"
            >
              <p className="text-3xl md:text-4xl font-bold mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-primary-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
