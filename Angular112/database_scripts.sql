Create Database EmployeeDB

USE [EmployeeDB]
CREATE TABLE Department
(
	Id INT IDENTITY(1, 1) NOT NULL,
	[Name] VARCHAR(500) NOT NULL
)

USE [EmployeeDB]
CREATE TABLE Employee
(
	Id	INT IDENTITY(1,1) NOT NULL,
	[Name] VARCHAR(250) NOT NULL,
	Department VARCHAR(500) NOT NULL,
	DateOfJoined DATE,
	PhotoName VARCHAR(500)
)

INSERT INTO Department (Name)
VALUES ('IT');

INSERT INTO Department (Name)
VALUES ('Support');

INSERT INTO Employee(Name, Department, DateOfJoined, PhotoName)
VALUES('Jayantha', 'IT', '2020-02-21', 'anonymous.png')


INSERT INTO Employee(Name, Department, DateOfJoined, PhotoName)
VALUES('Sukeshini', 'IT', '2020-06-26', 'anonymous.png')
