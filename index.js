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
                "Update Employee",
                "Delete Employee",
                "Delete Role",
                "Delete Department",
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
                case "Update Employee":
                    updateEmployee();
                    break;


                case "Delete Employee":
                    deleteInformation();

                    break;
                    case "Delete Role":
                        deleteRole();
    
                        break;
                        case "Delete Department":
                            deleteDept();
        
                            break;

                case "Exit":
                    connection.end();
            }
        });
}

function addEmployee() {
    inquirer
        .prompt([{
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
                name: "managerID",
                type: "number",
                message: "What is the employee manager's ID?",

            },
            {
                name: "addRoleId",
                type: "number",
                message: "What is role ID?",
                validate: function (answer) {
                    if (isNaN(answer)) {
                        return "ID must only contain numbers.";
                    } else {
                        return true;
                    }
                },
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?", {
                    firstName: answer.addFirstName,
                    lastName: answer.addLastName,
                    roleId: answer.addRoleId,
                    managerId: answer.managerId

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
    connection.query("SELECT * FROM employee", function (err, results) {
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
            }, {


                name: "deptName",
                type: "input",
                message: "What is the department ID for the role?",
            },


            {
                name: "salary",
                type: "number",
                message: "What is the role's salary?",

            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO roles SET ?", {
                    roles: answer.addRole,
                    deptId: answer.deptName,
                    salary: answer.salary,

                },
                function (err) {
                    if (err) throw err;
                    console.log("Role added");
                    start();
                }
            );
        });
}

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

        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?", {
                    deptName: answer.addDepartment,
                    deptManager: answer.deptManager,

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

function updateEmployee() {
    inquirer.prompt([{
                name: "updateEmployee",
                type: "input",
                message: "Which employee do you want to update?",
            },
            {
                name: "roleID",
                type: "number",
                message: "What is the new role ID?",
            }

        ]).then(function (answer) {



                connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    [{
                            roleId: answer.roleID
                        },
                        {
                            id: answer.updateEmployee
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;


                        start();
                    }

                )
            })
        }


            function deleteInformation() {
                inquirer.prompt(
                    {
                        name: "deleteEmp",
                        type: "number",
                        message: "What is the employee's ID number?",
                    }
        
                ).then (function (answer){
                connection.query(
                    "DELETE FROM employee WHERE ?",
                    {
                      id: answer.deleteEmp
                    },
                    function(err, res) {
                      if (err) throw err;
                   
                      start();
                    }
                  );
                })
            }
            function deleteRole() {
                inquirer.prompt(
                    {
                        name: "deleteRole",
                        type: "number",
                        message: "What is the role ID number?",
                    }
        
                ).then (function (answer){
                connection.query(
                    "DELETE FROM roles WHERE ?",
                    {
                      id: answer.deleteRole
                    },
                    function(err, res) {
                      if (err) throw err;
                   
                      start();
                    }
                  );
                })
            }
            function deleteDept() {
                inquirer.prompt(
                    {
                        name: "deleteDept",
                        type: "number",
                        message: "What is the department ID number?",
                    }
        
                ).then (function (answer){
                connection.query(
                    "DELETE FROM department WHERE ?",
                    {
                      id: answer.deleteDept
                    },
                    function(err, res) {
                      if (err) throw err;
                   
                      start();
                    }
                  );
                })
            }
                
                