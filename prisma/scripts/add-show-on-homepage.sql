-- Run once if your Doctor table already exists without showOnHomepage:
-- sqlcmd -S localhost\SQLEXPRESS -d EverestPolyclinic -E -i prisma/scripts/add-show-on-homepage.sql

IF COL_LENGTH('dbo.Doctor', 'showOnHomepage') IS NULL
BEGIN
    ALTER TABLE [dbo].[Doctor]
    ADD [showOnHomepage] BIT NOT NULL
        CONSTRAINT [Doctor_showOnHomepage_df] DEFAULT 0;
END
