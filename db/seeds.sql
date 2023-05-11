INSERT INTO department( name)
VALUES  ('Security'),
        ('Dev Team'),
        ('QA');
        
INSERT INTO role(title,salary, department_id)
VALUES  ('Eng Software', 100000, 2),
        ('QA Engineer',9000,3),
        ('CyberSecurity I',5000,1);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES  ('Mark','Doe',1,null),
        ('John','Vand',2, null),
        ('Sergio', 'Shema',3, null),
        ('Moe','Salaf',1, 1),
        ('Mus','albam',2 ,3);