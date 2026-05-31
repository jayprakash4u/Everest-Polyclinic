import Image from "next/image";

function EmergencyDoctorTeamCard({ doctors }) {
  if (!doctors || doctors.length === 0) return null;

  return (
    <div className="mb-8">
      <h4 className="text-2xl font-heading font-bold text-slate-800 mb-6 text-center">
        Our Emergency Ward Doctor Team
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-200 rounded-full overflow-hidden">
              <Image
                src={doctor.img}
                alt={doctor.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <h5 className="font-semibold text-slate-800 text-lg mb-2">
              {doctor.name}
            </h5>
            <p className="text-sm text-slate-600 mb-3">{doctor.spec}</p>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-slate-500">Available</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmergencyDoctorTeamCard;
