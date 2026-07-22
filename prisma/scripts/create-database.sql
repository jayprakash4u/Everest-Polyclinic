-- Run in SQL Server Management Studio (SSMS) or sqlcmd before `npm run db:push`
-- Server: localhost\SQLEXPRESS
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'EverestPolyclinic')
BEGIN
  CREATE DATABASE [EverestPolyclinic];
END
GO
