import { STATS } from "@/constants";

export default function FloatingCards({ stats = STATS }) {
  const items = stats?.length ? stats : STATS;

  return (
    <section className="relative z-10 -mt-48 px-4">
      <div className="container mx-auto">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((stat) => (
            <div
              key={stat.label}
              className="rounded-br-3xl rounded-tl-3xl bg-primary-600 px-4 py-6 text-center text-white shadow-lg"
            >
              <p className="mb-1 text-3xl font-bold md:text-4xl">{stat.value}</p>
              <p className="text-sm text-primary-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
