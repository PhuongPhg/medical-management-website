# Requirements:
- JDK
- Maven
- MySQL server
# Running the app manually
```
mvn spring-boot:run
```
# Config:
Open src/main/resources/application.properties

```
spring.datasource.url= jdbc:mysql://localhost:3306/testdb?useSSL=false
spring.datasource.username= root
spring.datasource.password= 1234
```
# After first run:
```
Insert those statement to MySQL:
INSERT INTO roles(name) VALUES('ROLE_DOCTOR');
INSERT INTO roles(name) VALUES('ROLE_PATIENT');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```

# API documentation:
More detailed check swagger.json file.
Default port: 8080. APIs provided for now:
| Methods | URLs              | Actions                                                       |
|:-------:|-------------------|---------------------------------------------------------------|
| POST    | /api/auth/signup  | sign up new account                                           |
| POST    | /api/auth/signin  | sign in account                                               |
| GET     | /api/test/all     | public content                                                |
| GET     | /api/test/admin   | access Admin's content, only Admin have authority             |
| GET     | /api/test/doctor  | access Doctor's content, only Doctor and Admin have authority |
| GET     | /api/test/patient | access Patient's content, all except public have authority    |

