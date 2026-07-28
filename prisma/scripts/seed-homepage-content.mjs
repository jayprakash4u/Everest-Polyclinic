import odbc from "odbc";

const connectionString =
  process.env.SQLSERVER_CONNECTION_STRING ??
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

const CENTERS_OF_EXCELLENCE = [
  {
    title: "Orthopaedics",
    description:
      "Expert diagnosis and treatment for bone, joint, and mobility conditions.",
    image: "/images/Center of excellences/1.png",
    slug: "orthopedics",
  },
  {
    title: "Oncology",
    description:
      "Comprehensive care and advanced treatment for cancer patients.",
    image: "/images/Center of excellences/2.png",
    slug: null,
  },
  {
    title: "Pediatrics",
    description:
      "Dedicated care for infants, children, and adolescents at every stage.",
    image: "/images/Center of excellences/3.png",
    slug: "pediatrics",
  },
  {
    title: "Dermatology",
    description:
      "Medical and aesthetic skin care with precise, patient-focused treatment.",
    image: "/images/Center of excellences/4.png",
    slug: "dermatology",
  },
  {
    title: "Physiotherapy",
    description:
      "Rehabilitation and movement therapy to restore strength and function.",
    image: "/images/Center of excellences/5.png",
    slug: "physiotherapy",
  },
  {
    title: "Anaesthesia",
    description: "Expert pain management and surgical anaesthesia services.",
    image: "/images/Center of excellences/6.png",
    slug: null,
  },
];

const WHY_CHOOSE_US = [
  {
    title: "International Standards",
    description:
      "JCI-aligned protocols and internationally trained medical professionals.",
    icon: "globe",
  },
  {
    title: "24/7 Emergency Care",
    description:
      "Round-the-clock emergency services with rapid response teams.",
    icon: "alarm",
  },
  {
    title: "NABL Accredited Lab",
    description:
      "ISO 15189:2012 certified laboratory ensuring accurate diagnostics.",
    icon: "shield",
  },
  {
    title: "Home Sample Collection",
    description:
      "Convenient doorstep blood and sample collection across Kathmandu.",
    icon: "home",
  },
  {
    title: "Online Reports",
    description:
      "Secure digital reports delivered within 24 hours via WhatsApp and email.",
    icon: "document",
  },
  {
    title: "Expert Specialists",
    description:
      "50+ specialists across medical specialties with decades of experience.",
    icon: "users",
  },
];

const STATS = [
  { value: "25,000+", label: "Patients Treated" },
  { value: "50+", label: "Specialist Doctors" },
  { value: "15+", label: "Years of Excellence" },
  { value: "500+", label: "Lab Tests Available" },
];

function sqlString(value) {
  if (value == null) return "NULL";
  return `N'${String(value).replace(/'/g, "''")}'`;
}

async function main() {
  console.log("Seeding homepage content via ODBC...");
  const connection = await odbc.connect(connectionString);
  const now = new Date().toISOString();

  await connection.query("DELETE FROM [dbo].[CenterOfExcellence]");
  for (const [index, item] of CENTERS_OF_EXCELLENCE.entries()) {
    await connection.query(`
      INSERT INTO [dbo].[CenterOfExcellence]
        ([title], [description], [image], [slug], [sortOrder], [isActive], [createdAt], [updatedAt])
      VALUES (
        ${sqlString(item.title)},
        ${sqlString(item.description)},
        ${sqlString(item.image)},
        ${item.slug ? sqlString(item.slug) : "NULL"},
        ${index},
        1,
        ${sqlString(now)},
        ${sqlString(now)}
      )
    `);
  }

  await connection.query("DELETE FROM [dbo].[WhyChooseUsItem]");
  for (const [index, item] of WHY_CHOOSE_US.entries()) {
    await connection.query(`
      INSERT INTO [dbo].[WhyChooseUsItem]
        ([title], [description], [icon], [sortOrder], [isActive], [createdAt], [updatedAt])
      VALUES (
        ${sqlString(item.title)},
        ${sqlString(item.description)},
        ${sqlString(item.icon)},
        ${index},
        1,
        ${sqlString(now)},
        ${sqlString(now)}
      )
    `);
  }

  await connection.query(
    "DELETE FROM [dbo].[Statistic] WHERE [context] = N'site'",
  );
  for (const [index, item] of STATS.entries()) {
    await connection.query(`
      INSERT INTO [dbo].[Statistic]
        ([value], [label], [context], [sortOrder], [isActive])
      VALUES (
        ${sqlString(item.value)},
        ${sqlString(item.label)},
        N'site',
        ${index},
        1
      )
    `);
  }

  const centers = await connection.query(
    "SELECT COUNT(*) AS count FROM [dbo].[CenterOfExcellence]",
  );
  const why = await connection.query(
    "SELECT COUNT(*) AS count FROM [dbo].[WhyChooseUsItem]",
  );
  const stats = await connection.query(
    "SELECT COUNT(*) AS count FROM [dbo].[Statistic] WHERE [context] = N'site'",
  );

  console.log(
    `Seeded centers=${centers[0].count}, whyChooseUs=${why[0].count}, siteStats=${stats[0].count}`,
  );

  await connection.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
