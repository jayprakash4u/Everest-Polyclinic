import { STATS } from "@/constants";

export default function Stats({ stats = STATS }) {
  const items = stats?.length ? stats : STATS;

  return (
    <section className="bg-primary-700 py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {items.map((stat) => (
            <div key={stat.label} className="text-white">
              <p className="mb-2 font-heading text-4xl font-bold md:text-5xl">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-primary-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
