CREATE TABLE app_user(
    userId SERIAL PRIMARY KEY,
    email VARCHAR(60),
    password VARCHAR(70),
    github_userName VARCHAR(60) UNIQUE
);
CREATE TABLE task(
    taskId SERIAL PRIMARY KEY,
    description varchar(120),
    dueDate DATE,
    userId INTEGER REFERENCES app_user(userId)
);
