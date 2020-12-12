# Requirements:
- JDK
- Maven
- MySQL server
# Running the app manually
```
mvn spring-boot:run
```
Or
```
java -jar medical-management-0.0.1-SNAPSHOT.jar
```
# Config:
Open src/main/resources/application.properties

```
spring.datasource.url= jdbc:mysql://localhost:3306/testdb?useSSL=false
spring.datasource.username= root
spring.datasource.password= 123456
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
| GET     | /api/admin   | access Admin's content, only Admin have authority             |
| GET     | /api/doctor  | access Doctor's content, only Doctor have authority |
| GET     | /api/patient | access Patient's content, only Patient have authority    |

## Admin user management
| Methods | URLs              | Actions                                                       |
|:-------:|-------------------|---------------------------------------------------------------|
| GET     | /api/admin   | access Admin homepage, only Admin have authority             |
| GET     | /api/admin/user  | list all users, only Admin have authority |
| GET     | /api/admin/user/{id} | list specified user by id, only Admin have authority    |
| POST    | /api/admin/user/{id} | update specified user by id, only Admin have authority  |                     
| DELETE  | /api/admin/user/{id} | update specified user by id, only Admin have authority |                                        

