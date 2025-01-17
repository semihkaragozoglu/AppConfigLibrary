USE [ConfigDB]
GO
/****** Object:  Table [dbo].[Configuration]    Script Date: 3/9/2020 2:28:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Configuration](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Type] [nvarchar](50) NOT NULL,
	[Value] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[ApplicationName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Configuration] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Configuration] ON 

INSERT [dbo].[Configuration] ([ID], [Name], [Type], [Value], [IsActive], [ApplicationName]) VALUES (32, N'SiteName', N'String', N'Kariyer.net', 1, N'Service-A')
INSERT [dbo].[Configuration] ([ID], [Name], [Type], [Value], [IsActive], [ApplicationName]) VALUES (33, N'MaxItemCount', N'Integer', N'123', 1, N'Service-A')
INSERT [dbo].[Configuration] ([ID], [Name], [Type], [Value], [IsActive], [ApplicationName]) VALUES (34, N'IsBasketEnabled', N'Boolean', N'false', 1, N'Service-A')
INSERT [dbo].[Configuration] ([ID], [Name], [Type], [Value], [IsActive], [ApplicationName]) VALUES (37, N'SiteName', N'String', N'boyner1.com', 1, N'Console1')
INSERT [dbo].[Configuration] ([ID], [Name], [Type], [Value], [IsActive], [ApplicationName]) VALUES (40, N'MaxItemCount', N'Integer', N'123', 1, N'Console1')
INSERT [dbo].[Configuration] ([ID], [Name], [Type], [Value], [IsActive], [ApplicationName]) VALUES (42, N'IsBasketEnabled', N'Boolean', N'true', 1, N'Console1')
INSERT [dbo].[Configuration] ([ID], [Name], [Type], [Value], [IsActive], [ApplicationName]) VALUES (44, N'SiteName', N'String', N'kariyer2.net', 1, N'Service-B')
INSERT [dbo].[Configuration] ([ID], [Name], [Type], [Value], [IsActive], [ApplicationName]) VALUES (45, N'MaxItemCount', N'Integer', N'23', 1, N'Service-B')
INSERT [dbo].[Configuration] ([ID], [Name], [Type], [Value], [IsActive], [ApplicationName]) VALUES (46, N'IsBasketEnabled', N'Boolean', N'false', 1, N'Service-B')
SET IDENTITY_INSERT [dbo].[Configuration] OFF
