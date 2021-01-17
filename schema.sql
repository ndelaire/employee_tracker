DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  roleId INT NOT NULL,
  managerId INT,
  PRIMARY KEY(id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  deptName VARCHAR(50) NOT NULL,
  deptManager VARCHAR(30) NOT NULL,

  PRIMARY KEY(id)
);

CREATE TABLE roles (
   id INT NOT NULL AUTO_INCREMENT,
  roles VARCHAR(30) NOT NULL,
  deptId INT NOT NULL,
  salary DECIMAL ,
  primary key(id)
);