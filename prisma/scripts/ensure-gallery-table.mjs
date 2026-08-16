import odbc from "odbc";

const connectionString =
  process.env.SQLSERVER_CONNECTION_STRING ??
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

const sql = `
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'GalleryImage')
BEGIN
  CREATE TABLE [dbo].[GalleryImage] (
    [id] INT NOT NULL IDENTITY(1,1),
    [src] NVARCHAR(500) NOT NULL,
    [alt] NVARCHAR(300) NOT NULL,
    [caption] NVARCHAR(300) NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [GalleryImage_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [GalleryImage_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [GalleryImage_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [GalleryImage_pkey] PRIMARY KEY CLUSTERED ([id])
  );
END
`;

const connection = await odbc.connect(connectionString);
await connection.query(sql);
console.log("GalleryImage table ready");
await connection.close();
