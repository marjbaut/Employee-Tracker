// ----------------------------------works------------------
const inquirer = require('inquirer');
// creating a connection
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PW,
    database: 'employee_db',
    port: 3306
})

db.connect(function () {
    console.log('Welcome to Employee ontent Management System')
    displayMenu()
})
//QUESTIONS
const questions = [
    {
        type: 'list',
        name: 'toDo',
        message: ' What would you like to do?',
        choices: [
            'view all departments', 'view all roles', 'view all employees',
            'add a department', 'add a role',
            'add an employee', 'update an employee role'
        ]
    }
]


function displayMenu() {
    return inquirer.prompt(questions)
        .then(response => {
            console.log(response.toDo)
            switch (response.toDo) {
                case 'view all departments':
                    viewDepartments();
                    break;
                case "view all roles":
                    viewRoles();
                    break;
                case "view all employees":
                    viewEmployees();
                    break;
                case "add a department":
                    addDepartment();
                    break;
                case "add a role":
                    addRole();
                    break;
                case "add an employee":
                    addEmployee();
                    break;
                case "update an employee role":
                    addEmployeeRole();
                    break;
                default:
                    db.end()
                    process.exit(0)
            }
        })
}
function viewDepartments() {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        displayMenu();
    })
};

function viewRoles() {
    db.query('SELECT * FROM role', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        displayMenu();
    })
}
function viewEmployees() {

    db.query(`SELECT employee.id, employee.first_name, employee.last_name  , role.title ,
    department.name 
   AS department , role.salary, man.first_name AS manager
   FROM  employee 
   LEFT JOIN role ON employee.role_id = role.id
   LEFT JOIN department ON role.department_id = department.id
   LEFT JOIN employee man  ON employee.manager_id = man.id`
        , (err, result) => {
            if (err) {
                console.log(err);
            }
            console.table(result);
            displayMenu();
        })
}

function addDepartment() {
    console.log('works')
    let departmentArray = []
    db.query("select * from department ", function (err, data) {
        if (err) throw err;
        departmentArray = data.map(ele => ({
            name: ele.name,
            value: ele.id
        }))

        inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'enter name of the new department?'
            }
        ]
        ).then(response => {
            db.query(`INSERT INTO department(name) VALUES (?);`, [response.departmentName], function (err, data) {
                if (err) throw err;
                console.log(data)
                console.table(response)
                displayMenu()
            })
        }
        )

    }
    )
}
;
function addRole() {
    console.log('works')
    // let roleArray = []
    let roleArray = []
    db.query("select * from role ", function (err, data) {
        if (err) throw err;
        roleArray = data.map(ele => ({
            name: ele.name,
            value: ele.id
        }))

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'enter title of the new role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'enter salary fro this role?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'enter department ID where this title will reporting?'
            },

        ]
        ).then(response => {
            db.query(`INSERT INTO role(title,salary, department_id) VALUES (?,?,?)`, [response.title, response.salary, response.department_id], function (err, data) {
                if (err) throw err;
                console.log(data)
                console.table(response)
                displayMenu()
            })
        })
    }
    )
}
;

function addEmployee() {
    console.log('works')
    let roleArray = []
    let managerArray = []
    db.query("select id,title from role", function (err, data) {
        if (err) throw err;
        roleArray = data.map(ele => ({
            name: ele.title,
            value: ele.id
        }))
        console.log(roleArray)

        db.query("select id,first_name ,last_name from employee where manager_id is null", function (err, data) {
            if (err) throw err;
            managerArray = data.map(ele => ({
                name: ele.first_name + "," + ele.last_name,
                value: ele.id
            }))

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'enter first name?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'enter last name?'
                },
                {
                    type: 'list',
                    name: 'roleID',
                    message: ' What is the role ID',
                    choices: roleArray
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: ' who will the manager be',
                    choices: managerArray
                }
            ]).then(response => {
                db.query(`INSERT INTO employee(first_name,last_name,role_id,manager_id)
        VALUES  (?,?,?,?);`, [response.firstName, response.lastName, response.roleID, response.manager], function (err, data) {
                    if (err) throw err;
                    console.log(data)
                    console.table(response)
                    displayMenu()
                })
            })
        })
    })

};

