var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employeeDB"
});

connection.connect(function(err) {
    if (err) throw err;
    selectOption();
  });

  function selectOption() {
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
            "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.selectOption) {
        case "Add Employee":
          addEmployee();
          break;
  
        case  "View All Employees":
          viewEmployees();
          break;
  
        case  "Add Role":
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