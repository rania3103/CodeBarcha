CREATE DATABASE codeBarchaDb;

CREATE TABLE app_user(
    userId SERIAL PRIMARY KEY,
    userName VARCHAR(50),
    email VARCHAR(60),
    password VARCHAR(70)
);
CREATE TABLE task(
    taskId SERIAL PRIMARY KEY,
    description varchar(120),
    dueDate DATE,
    userId INTEGER REFERENCES app_user(userId)
);