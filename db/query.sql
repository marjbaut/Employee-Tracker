USE employee_db;

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT employee.id, employee.first_name, employee.last_name , role.title , department.name AS department , role.salary, employee.first_name AS manager
FROM  employee 
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
JOIN employee man  ON employee.manager_id = man.id;