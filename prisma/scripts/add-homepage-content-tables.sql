-- Add CenterOfExcellence and WhyChooseUsItem tables

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'CenterOfExcellence')
BEGIN
  CREATE TABLE [dbo].[CenterOfExcellence] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(200) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [image] NVARCHAR(500) NOT NULL,
    [slug] NVARCHAR(150) NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [CenterOfExcellence_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [CenterOfExcellence_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CenterOfExcellence_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [CenterOfExcellence_pkey] PRIMARY KEY CLUSTERED ([id])
  );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'WhyChooseUsItem')
BEGIN
  CREATE TABLE [dbo].[WhyChooseUsItem] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(200) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [icon] NVARCHAR(100) NOT NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [WhyChooseUsItem_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [WhyChooseUsItem_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [WhyChooseUsItem_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [WhyChooseUsItem_pkey] PRIMARY KEY CLUSTERED ([id])
  );
END
GO
