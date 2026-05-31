import { STATS } from "@/constants";

export default function Stats() {
  return (
    <section className="py-14 bg-primary-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-white">
              <p className="font-heading text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </p>
              <p className="text-primary-200 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
