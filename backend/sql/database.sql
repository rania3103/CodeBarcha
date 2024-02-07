CREATE TABLE app_user(
    userId SERIAL PRIMARY KEY,
    email VARCHAR(60),
    password VARCHAR(70),
    githubusername VARCHAR(60) UNIQUE,
    githubaccesstoken varchar(100)
);
CREATE TABLE task(
    taskid SERIAL PRIMARY KEY,
    description varchar(120),
    duedate DATE,
    userid INTEGER REFERENCES app_user(userId)
);
