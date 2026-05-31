import React from "react";

export default function CenterOfExcellenceSection() {
  const departments = [
    {
      title: "Orthopaedics",
      desc: "Expert diagnosis and treatment of bone and joint disorders.",
      svg: <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />, // Example icon path
    },
    {
      title: "Oncology",
      desc: "Comprehensive care and advanced treatment for cancer patients.",
      svg: (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      ),
    },
    {
      title: "Pediatrics",
      desc: "Specialized medical care for infants, children, and adolescents.",
      svg: (
        <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.71 3.31-2 6-2z" />
      ),
    },
    {
      title: "Dermatology",
      desc: "Advanced treatment for all types of skin and hair conditions.",
      svg: (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      ),
    },
    {
      title: "Physiotherapy",
      desc: "Rehabilitation and physical therapy for optimal recovery.",
      svg: (
        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
      ),
    },
    {
      title: "Anaesthesia",
      desc: "Expert pain management and surgical anesthesia services.",
      svg: (
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
      ),
    },
  ];

  return (
    <section
      className="excellence"
      style={{
        background: "linear-gradient(160deg, #061d2e 0%, #0c3347 100%)",
        padding: "80px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Subtle Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(2, 132, 199, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          marginBottom: "60px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            color: "#0284c7", // sky-600
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
          Center of Excellence
        </h2>
        <div
          style={{
            width: "40px",
            height: "2px",
            background: "#0284c7",
            margin: "10px auto",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {departments.map((dept, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              background: "rgba(255, 255, 255, 0.02)",
              padding: "20px",
              borderRadius: "6px",
              border: "1px solid rgba(2, 132, 199, 0.15)",
              transition: "transform 0.2s ease",
            }}
          >
            {/* Left side: SVG Icon Box */}
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "rgba(2, 132, 199, 0.1)",
                borderRadius: "4px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(2, 132, 199, 0.3)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="#0284c7"
                style={{ width: "32px", height: "32px" }}
              >
                {dept.svg}
              </svg>
            </div>

            {/* Right side: Minimalist Content */}
            <div style={{ textAlign: "left" }}>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#f8fafc",
                  marginBottom: "4px",
                }}
              >
                {dept.title}
              </h3>
              <p
                style={{
                  fontSize: "11px", // Kept very small as requested
                  color: "rgba(241, 245, 249, 0.7)",
                  lineHeight: "1.4",
                  maxWidth: "200px",
                }}
              >
                {dept.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
