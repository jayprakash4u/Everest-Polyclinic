BEGIN TRY

BEGIN TRAN;

-- CreateSchema
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = N'dbo') EXEC sp_executesql N'CREATE SCHEMA [dbo];';

-- CreateTable
CREATE TABLE [dbo].[SiteSetting] (
    [id] INT NOT NULL CONSTRAINT [SiteSetting_id_df] DEFAULT 1,
    [name] NVARCHAR(200) NOT NULL,
    [shortName] NVARCHAR(100) NOT NULL,
    [tagline] NVARCHAR(300) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [phone] NVARCHAR(50) NOT NULL,
    [email] NVARCHAR(200) NOT NULL,
    [address] NVARCHAR(500) NOT NULL,
    [workingHours] NVARCHAR(200) NOT NULL,
    [emergencyHotline] NVARCHAR(50) NOT NULL,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [SiteSetting_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AdminUser] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(150) NOT NULL,
    [username] NVARCHAR(100) NOT NULL,
    [email] NVARCHAR(200) NOT NULL,
    [passwordHash] NVARCHAR(500) NOT NULL,
    [role] NVARCHAR(50) NOT NULL CONSTRAINT [AdminUser_role_df] DEFAULT 'admin',
    [isActive] BIT NOT NULL CONSTRAINT [AdminUser_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [AdminUser_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [AdminUser_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [AdminUser_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [AdminUser_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[DoctorCategory] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(150) NOT NULL,
    [slug] NVARCHAR(150) NOT NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [DoctorCategory_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [DoctorCategory_isActive_df] DEFAULT 1,
    CONSTRAINT [DoctorCategory_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [DoctorCategory_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[Doctor] (
    [id] INT NOT NULL IDENTITY(1,1),
    [categoryId] INT NOT NULL,
    [name] NVARCHAR(200) NOT NULL,
    [education] NVARCHAR(300) NOT NULL,
    [experience] NVARCHAR(100) NOT NULL,
    [image] NVARCHAR(500) NOT NULL,
    [phone] NVARCHAR(50),
    [timing] NVARCHAR(200),
    [sortOrder] INT NOT NULL CONSTRAINT [Doctor_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [Doctor_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Doctor_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Doctor_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Department] (
    [id] INT NOT NULL IDENTITY(1,1),
    [legacyId] INT,
    [title] NVARCHAR(200) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [icon] NVARCHAR(100) NOT NULL,
    [color] NVARCHAR(50) NOT NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [Department_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [Department_isActive_df] DEFAULT 1,
    CONSTRAINT [Department_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Department_legacyId_key] UNIQUE NONCLUSTERED ([legacyId])
);

-- CreateTable
CREATE TABLE [dbo].[SpecialtyService] (
    [id] INT NOT NULL IDENTITY(1,1),
    [legacyId] INT,
    [title] NVARCHAR(200) NOT NULL,
    [icon] NVARCHAR(100) NOT NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [SpecialtyService_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [SpecialtyService_isActive_df] DEFAULT 1,
    CONSTRAINT [SpecialtyService_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [SpecialtyService_legacyId_key] UNIQUE NONCLUSTERED ([legacyId])
);

-- CreateTable
CREATE TABLE [dbo].[ServiceDetail] (
    [id] INT NOT NULL IDENTITY(1,1),
    [specialtyServiceId] INT NOT NULL,
    [title] NVARCHAR(200) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [headerImage] NVARCHAR(500),
    [color] NVARCHAR(50),
    [contentJson] NVARCHAR(max),
    CONSTRAINT [ServiceDetail_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ServiceDetail_specialtyServiceId_key] UNIQUE NONCLUSTERED ([specialtyServiceId])
);

-- CreateTable
CREATE TABLE [dbo].[HealthPackageSection] (
    [id] INT NOT NULL IDENTITY(1,1),
    [section] NVARCHAR(200) NOT NULL,
    [icon] NVARCHAR(100) NOT NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [HealthPackageSection_sortOrder_df] DEFAULT 0,
    CONSTRAINT [HealthPackageSection_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[HealthPackage] (
    [id] INT NOT NULL IDENTITY(1,1),
    [sectionId] INT NOT NULL,
    [legacyId] INT,
    [name] NVARCHAR(200) NOT NULL,
    [price] INT NOT NULL,
    [originalPrice] INT,
    [badge] NVARCHAR(100),
    [testsJson] NVARCHAR(max) NOT NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [HealthPackage_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [HealthPackage_isActive_df] DEFAULT 1,
    CONSTRAINT [HealthPackage_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BlogCategory] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(150) NOT NULL,
    [slug] NVARCHAR(150) NOT NULL,
    CONSTRAINT [BlogCategory_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [BlogCategory_name_key] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [BlogCategory_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[BlogPost] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(300) NOT NULL,
    [slug] NVARCHAR(300) NOT NULL,
    [excerpt] NVARCHAR(max) NOT NULL,
    [body] NVARCHAR(max),
    [image] NVARCHAR(500) NOT NULL,
    [categoryId] INT NOT NULL,
    [readTimeMinutes] INT NOT NULL CONSTRAINT [BlogPost_readTimeMinutes_df] DEFAULT 5,
    [featured] BIT NOT NULL CONSTRAINT [BlogPost_featured_df] DEFAULT 0,
    [isPublished] BIT NOT NULL CONSTRAINT [BlogPost_isPublished_df] DEFAULT 1,
    [publishedAt] DATETIME2 NOT NULL CONSTRAINT [BlogPost_publishedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BlogPost_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [BlogPost_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [BlogPost_slug_key] UNIQUE NONCLUSTERED ([slug])
);

-- CreateTable
CREATE TABLE [dbo].[Testimonial] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(150) NOT NULL,
    [location] NVARCHAR(150) NOT NULL,
    [rating] INT NOT NULL CONSTRAINT [Testimonial_rating_df] DEFAULT 5,
    [review] NVARCHAR(max) NOT NULL,
    [avatar] NVARCHAR(500),
    [sortOrder] INT NOT NULL CONSTRAINT [Testimonial_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [Testimonial_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Testimonial_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Testimonial_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Faq] (
    [id] INT NOT NULL IDENTITY(1,1),
    [question] NVARCHAR(500) NOT NULL,
    [answer] NVARCHAR(max) NOT NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [Faq_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [Faq_isActive_df] DEFAULT 1,
    CONSTRAINT [Faq_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Statistic] (
    [id] INT NOT NULL IDENTITY(1,1),
    [value] NVARCHAR(50) NOT NULL,
    [label] NVARCHAR(200) NOT NULL,
    [context] NVARCHAR(50) NOT NULL CONSTRAINT [Statistic_context_df] DEFAULT 'site',
    [sortOrder] INT NOT NULL CONSTRAINT [Statistic_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [Statistic_isActive_df] DEFAULT 1,
    CONSTRAINT [Statistic_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContactSubmission] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(200) NOT NULL,
    [email] NVARCHAR(200) NOT NULL,
    [phone] NVARCHAR(50),
    [subject] NVARCHAR(300),
    [message] NVARCHAR(max) NOT NULL,
    [isRead] BIT NOT NULL CONSTRAINT [ContactSubmission_isRead_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContactSubmission_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ContactSubmission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AppointmentRequest] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(200) NOT NULL,
    [phone] NVARCHAR(50) NOT NULL,
    [email] NVARCHAR(200),
    [department] NVARCHAR(200),
    [preferredDate] DATETIME2,
    [timeSlot] NVARCHAR(50),
    [packageName] NVARCHAR(200),
    [packagePrice] NVARCHAR(50),
    [message] NVARCHAR(max),
    [status] NVARCHAR(50) NOT NULL CONSTRAINT [AppointmentRequest_status_df] DEFAULT 'pending',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [AppointmentRequest_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [AppointmentRequest_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[NewsletterSubscriber] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(200) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [NewsletterSubscriber_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [NewsletterSubscriber_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [NewsletterSubscriber_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[MediaAsset] (
    [id] INT NOT NULL IDENTITY(1,1),
    [filename] NVARCHAR(300) NOT NULL,
    [url] NVARCHAR(500) NOT NULL,
    [alt] NVARCHAR(300),
    [mimeType] NVARCHAR(100),
    [sizeBytes] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MediaAsset_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [MediaAsset_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Doctor] ADD CONSTRAINT [Doctor_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[DoctorCategory]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ServiceDetail] ADD CONSTRAINT [ServiceDetail_specialtyServiceId_fkey] FOREIGN KEY ([specialtyServiceId]) REFERENCES [dbo].[SpecialtyService]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[HealthPackage] ADD CONSTRAINT [HealthPackage_sectionId_fkey] FOREIGN KEY ([sectionId]) REFERENCES [dbo].[HealthPackageSection]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BlogPost] ADD CONSTRAINT [BlogPost_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[BlogCategory]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

