import Image from "next/image";

export default function AboutHospital() {
  return (
    <section className="bg-gray-100 py-20 px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT CONTENT */}
        <div className="flex-1">
          <p className="text-gray-500 text-sm">Welcome to</p>

          <h2 className="text-4xl font-extrabold text-[#1a3a5c] mt-1">
            Everest International Polyclinic
          </h2>

          <p className="text-primary-600 font-semibold mt-2">
            Your Health is our Mission
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Everest International Polyclinic is a multi-specialty healthcare center 
            under the bouquet of Everest Healthcare Services. Everest Healthcare was 
            founded with a vision to provide world-class medical services in the region.
          </p>

          <p className="text-gray-600 mt-3 leading-relaxed">
            Everest International Polyclinic provides comprehensive medical services 
            with state-of-the-art facilities and experienced healthcare professionals. 
            We are committed to delivering exceptional patient care with compassion and expertise.
          </p>

          <button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 font-semibold rounded transition-colors">
            READ MORE
          </button>
        </div>

        {/* RIGHT IMAGES */}
        <div className="flex-1 relative h-[400px]">

          {/* MAIN IMAGE */}
          <div className="absolute w-[260px] h-[300px] right-20 top-5 border-4 border-primary-600 rounded-xl overflow-hidden">
            <Image
              src="/images/hero/banner.png"
              alt="hospital"
              fill
              className="object-cover"
            />
          </div>

          {/* TOP SMALL */}
          <div className="absolute w-[160px] h-[180px] right-0 top-0 border-4 border-primary-600 rounded-lg overflow-hidden">
            <Image
              src="/images/about/1.jpg"
              alt="lab"
              fill
              className="object-cover"
            />
          </div>

          {/* BOTTOM SMALL */}
          <div className="absolute w-[160px] h-[180px] right-0 bottom-0 border-4 border-primary-600 rounded-lg overflow-hidden">
            <Image
              src="/images/about/2.jpg"
              alt="doctor"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
