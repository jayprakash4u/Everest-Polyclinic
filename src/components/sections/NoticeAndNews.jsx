export default function NoticeAndNews() {
  const notices = [
    {
      id: 1,
      title: "New COVID-19 Vaccination Drive",
      date: "April 10, 2026",
      description: "Free vaccination camp organized this weekend at our premises.",
    },
    {
      id: 2,
      title: "Extended Lab Services",
      date: "April 5, 2026",
      description: "Now open 24/7 for emergency blood tests and reports.",
    },
    {
      id: 3,
      title: "Special Health Packages",
      date: "March 28, 2026",
      description: "Get 20% off on comprehensive health checkup packages this month.",
    },
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Notice Board */}
          <div className="bg-white shadow-md overflow-hidden">
            <div className="bg-primary-600 text-white px-4 py-3 font-semibold">
              Notice Board
            </div>
            <div className="p-4 space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">{notice.date}</span>
                  </div>
                  <h4 className="font-medium text-slate-800 mb-1">{notice.title}</h4>
                  <p className="text-sm text-gray-600">{notice.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Latest News */}
          <div className="bg-white shadow-md overflow-hidden">
            <div className="bg-secondary-600 text-white px-4 py-3 font-semibold">
              Latest News
            </div>
            <div className="p-4 space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">{notice.date}</span>
                  </div>
                  <h4 className="font-medium text-slate-800 mb-1">{notice.title}</h4>
                  <p className="text-sm text-gray-600">{notice.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}