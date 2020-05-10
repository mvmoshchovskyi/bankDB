// # 1. +Вибрати усіх клієнтів, чиє ім'я має менше ніж 6 символів.
//
// use bank;
// select * from client
// where LENGTH(firstName) < 6;
//
// # 2. +Вибрати львівські відділення банку.+
//
// select *from client
// where city = 'lviv';
//
// # 3. +Вибрати клієнтів з вищою освітою та посортувати по прізвищу.
//
// select *from client
// where Education = 'high'
// order by LastName;
//
// # 4. +Виконати сортування у зворотньому порядку над таблицею Заявка і вивести 5 останніх елементів.
//
// select * from application
// ORDER BY idApplication DESC
// LIMIT 5;
//
// # 5. +Вивести усіх клієнтів, чиє прізвище закінчується на OV чи OVA.
//
// select *from client
// where lastName like '%ov' or lastName like '%ova';
//
// # 6. +Вивести клієнтів банку, які обслуговуються київськими відділеннями.
//
// SELECT * FROM client  JOIN department d on client.Department_idDepartment = d.idDepartment
// where departmentCity = 'Kyiv';
//
// # 7. +Вивести імена клієнтів та їхні номера телефону, погрупувавши їх за іменами.
// #  ?????????????? такого поля як телефон немає в таблиці .
//
// select FirstName , LastName , city  from client
// order by LastName;
//
// # 8. +Вивести дані про клієнтів, які мають кредит більше ніж на 5000 тисяч гривень.
//
// select *from client join application a on client.idClient = a.Client_idClient
// where Currency = 'gryvnia' and sum > 5000;
//
// # 9. +Порахувати кількість клієнтів усіх відділень та лише львівських відділень.
//
// select COUNT(idClient) AS countClient FROM client join department d on client.Department_idDepartment = d.idDepartment
// where DepartmentCity ='lviv'
// order by  DepartmentCity;
//
// # 10. Знайти кредити, які мають найбільшу суму для кожного клієнта окремо.
//
// select firstName,  lastName, sum from client join application a on client.idClient = a.Client_idClient
// order by sum desc;
//
// # 11. Визначити кількість заявок на крдеит для кожного клієнта.
//
// select firstName,  lastName , idApplication from client join application a on client.idClient = a.Client_idClient;
//
// # 12. Визначити найбільший та найменший кредити.
//
// select MAX(sum) AS 'Maximum Credit' , MIN(sum) AS 'Minimum Credit' from application;
//
// # 13. Порахувати кількість кредитів для клієнтів,які мають вищу освіту.
//
// select sum(sum) as 'credits' from client join application a on client.idClient = a.Client_idClient
// where Education = 'high';
//
// # 14. Вивести дані про клієнта, в якого середня сума кредитів найвища.
//
// select Client_idClient,FirstName,LastName, avg(SUM) as maxAvgSum from client join application a on client.idClient = a.Client_idClient
// group by Client_idClient desc
// limit 1 ;
//
// # 15. Вивести відділення, яке видало в кредити найбільше грошей
//
// SELECT sum(sum) moreMoney,DepartmentCity
// FROM client c
// JOIN application a on c.idClient = a.Client_idClient
// JOIN department d on c.Department_idDepartment = d.idDepartment
// group by DepartmentCity
// limit 1;
//
// # 16. Вивести відділення, яке видало найбільший кредит.
//
// SELECT DepartmentCity,sum
// FROM client c
// JOIN application a on c.idClient = a.Client_idClient
// JOIN department d on c.Department_idDepartment = d.idDepartment
// ORDER BY sum desc
// limit 1;
//
// # 17. Усім клієнтам, які мають вищу освіту, встановити усі їхні кредити у розмірі 6000 грн.
//
// UPDATE application SET sum = 6000
// WHERE Client_idClient IN (SELECT idClient FROM client WHERE Education = 'high');
// #######перевірка
// select *from client c join application a on c.idClient = a.Client_idClient
// where Education = 'high';
//
// # 18. Усіх клієнтів київських відділень пересилити до Києва.
//
// UPDATE client set City = 'KYIV'
// WHERE Department_idDepartment in (select idDepartment from department where DepartmentCity = 'Kyiv');
// #######перевірка
// select *from client c join department d on c.Department_idDepartment = d.idDepartment
// where DepartmentCity = 'kyiv';
//
// # 19. Видалити усі кредити, які є повернені.
// delete from application
// where CreditState = 'returned';
// #######перевірка
// select *from application;
//
// # 20. Видалити кредити клієнтів, в яких друга літера прізвища є голосною.
//
// delete from application
// WHERE Client_idClient IN
//       (SELECT idClient FROM client WHERE LastName like '_a%'
//           or lastName like '_e%'
//           or lastName like '_i%'
//           or lastName like '_o%'
//           or lastName like '_u%'
//           or lastName like '_y%');
// #######перевірка
// select *from client join application a on client.idClient = a.Client_idClient;
//
// # Знайти львівські відділення, які видали кредитів на загальну суму більше ніж 5000
//
// select * from client
//     join application a on client.idClient = a.Client_idClient
//     join department d on client.Department_idDepartment = d.idDepartment
// where DepartmentCity = 'lviv' and Sum > 5000;
//
// # Знайти клієнтів, які повністю погасили кредити на суму більше ніж 5000
//
// select * from client
//     join application a on client.idClient = a.Client_idClient
//     join department d on client.Department_idDepartment = d.idDepartment
// where CreditState = 'returned' and sum > 5000;
//
// # /* Знайти максимальний неповернений кредит.*/
//
// select * from client join application a on client.idClient = a.Client_idClient
// where CreditState = 'not returned'
// order by sum desc
// limit 1;
//
// # /*Знайти клієнта, сума кредиту якого найменша*/
//
// select *from client c join application a on c.idClient = a.Client_idClient
// order by sum;
//
// # /*Знайти кредити, сума яких більша за середнє значення усіх кредитів*/
//
// SELECT * FROM application
// WHERE sum > (SELECT AVG(sum) FROM application);
//
// # /*Знайти клієнтів, які є з того самого міста, що і клієнт, який взяв найбільшу кількість кредитів*/
//
// select count(sum) countCredit , city,LastName from client c
//     join application a on c.idClient = a.Client_idClient
// group by LastName
// order by countCredit desc
// limit 1;
// select *from client c join application a on c.idClient = a.Client_idClient
// where city like 'Krasne';
//
// # #місто чувака який набрав найбільше кредитів
//
// select sum(sum) mostSum , city, FirstName ,LastName from client c join application a on c.idClient = a.Client_idClient
// group by LastName
// order by mostSum desc
// limit 1;
// #
// #
// # set sql_safe_updates = 0;
// # set sql_safe_updates = 1;