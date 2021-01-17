const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");
require("dotenv").config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "selectOption",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "View All Employees",
                "Add Role",
                "View All Roles",
                "Add Department",
                "View All Departments",
                "Update Employee Role",
                "Update Employee Manager",
                "Delete Information",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.selectOption) {
                case "Add Employee":
                    addEmployee();
                    break;

                case "View All Employees":
                    viewEmployees();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "Exit":
                    connection.end();
            }
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                    name: "addFirstName",
                    type: "input",
                    message: "What is the first name?",
                },
                {
                    name: "addLastName",
                    type: "input",
                    message: "What is the last name?",
                },
                {
                    name: "addRole",
                    type: "input",
                    message: "What is the employee's role?",
                    // should this be a function to select from possible roles?
                },
                {
                    name: "addDept",
                    type: "input",
                    message: "What department are they in?",
                    // same question as above
                },
                {
                    name: "addRoleId",
                    type: "input",
                    message: "What is role ID?",
                    validate: function (answer) {
                        if (isNaN(answer)) {
                            return "ID must only contain numbers.";
                        } else {
                            return true;
                        }
                    },
                ])
            .then(function (answer) {
                connection.query(
                    "INSERT INTO employees SET ?", {
                        firstName: answer.firstName,
                        lastName: answer.lastName,
                        addDepartment: answer.addDepartment,
                        addRoleId: answer.addRoleId

                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Employee added.");
                        start()
                    }
                );
            });
        }

    function viewEmployees() {
        connection.query("SELECT * FROM employees", function (err, results) {
            if (err) throw err;
            console.table(results);
            start();
          });
    }

    function addRole() {
        inquirer
            .prompt([{
                name: "addRole",
                type: "input",
                message: "What role would you like to add?",
            }])
            .then(function (answer) {
                connection.query(
                    "INSERT INTO roles SET ?", {
                        role: answer.addRole,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Role added");
                        start();
                    }
                );
            });

        function viewRoles() {
            connection.query("SELECT * FROM roles", function (err, results) {
                if (err) throw err;
                console.table(results);
                start();
              });
        }

        function addDepartment() {
            inquirer
                .prompt([{
                        name: "addDepartment",
                        type: "input",
                        message: "What department would you like to add?",
                    },
                    {
                        name: "deptManager",
                        type: "input",
                        message: "Who manages this department?",
                    },
                    {
                        name: "deptId",
                        type: "input",
                        message: "What is the Department ID?",
                        validate: function (answer) {
                            if (isNaN(answer)) {
                                return "ID must only contain numbers.";
                            } else {
                                return true;
                            }
                        },
                    },
                ])
                .then(function (answer) {
                    connection.query(
                        "INSERT INTO department SET ?", {
                            departmentName: answer.departmentName,
                            deptManager: answer.deptManager,
                            deptId: answer.deptID
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("Department added");
                            start();
                        }
                    );
                });
        }

        function viewDepartments() {
            connection.query("SELECT * FROM department", function (err, results) {
                if (err) throw err;
                console.table(results);
                start();
              });
        }

        function updateRole() {}

        function updateManager() {}