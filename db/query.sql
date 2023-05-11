USE employee_db;

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT employee.id, employee.first_name, employee.last_name  , role.title ,
 department.name 
AS department , role.salary, man.first_name AS manager
FROM  employee 
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee man  ON employee.manager_id = man.id;
