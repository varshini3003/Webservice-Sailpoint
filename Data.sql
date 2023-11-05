-- Upload this SQL file into your MySQL system

CREATE DATABASE SAMPLE_DB;
USE SAMPLE_DB;

-- Tables 

CREATE TABLE SAMPLE_DB.ACCOUNTS (Employee_id VARCHAR(10), firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), Account_status char(1));
CREATE TABLE SAMPLE_DB.MYGROUPS (Group_id VARCHAR(10), Group_name VARCHAR(50), Group_description VARCHAR(300));
CREATE TABLE SAMPLE_DB.USER_GROUPS (Employee_id VARCHAR(10), Group_id VARCHAR(10));

-- Account and entitlement information

INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC229", "Ajinkya", "Rahane", "rahane@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC219", "Devdutt", "Padikal", "padikal@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC232", "Mayank", "Agarwal", "mayanka@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC241", "Rashid", "Khan", "rashidk@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC233", "Ruturaj", "Gaikwad", "rutug@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC227", "Shardul", "Thakur", "shardul@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC212", "Shivam", "Dube", "shivam@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC235", "Shubman", "Gill", "sara@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC205", "Suryakumar", "Yadav", "skyadav@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC234", "Yuzvendra", "Chahal", "yuzi@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC193", "Virat", "Kohli", "kohli@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC228", "Ishan", "Kishan", "ishanshub@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC192", "Mohammed", "Shami", "shami@web.com", "A");
INSERT INTO SAMPLE_DB.ACCOUNTS VALUES ("ICC190", "Mahendra Singh", "Dhoni", "mahi@web.com", "A");

INSERT INTO SAMPLE_DB.MYGROUPS VALUES ("RBA1", "Player", "Player has permissions to bat, bowl or field");
INSERT INTO SAMPLE_DB.MYGROUPS VALUES ("RBA2", "Captain", "The captain has additional entitlements to player, such as making strategic decisions on the field");
INSERT INTO SAMPLE_DB.MYGROUPS VALUES ("RBA3", "Substitute", "Substitutes play only when existing players face injuries");
INSERT INTO SAMPLE_DB.MYGROUPS VALUES ("RBA4", "Coach", "Coaches do not play the game but conduct training sessions, guide players, work with the captain to devise game strategies");
INSERT INTO SAMPLE_DB.MYGROUPS VALUES ("RBA5", "Umpire", "Umpires do not play but judge the decisions of the match");
INSERT INTO SAMPLE_DB.MYGROUPS VALUES ("RBA6", "Batsman", "Can only bat");
INSERT INTO SAMPLE_DB.MYGROUPS VALUES ("RBA7", "Bowler", "Can only bowl");
INSERT INTO SAMPLE_DB.MYGROUPS VALUES ("RBA8", "Wicket-Keeper", "Can only do wicket-keeping");

INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC234", "RBA1");
INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC227", "RBA3");
INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC212", "RBA5");
INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC232", "RBA2");
INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC241", "RBA4");
INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC229", "RBA1");
INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC219", "RBA1");
INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC233", "RBA1");
INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC235", "RBA1");
INSERT INTO SAMPLE_DB.USER_GROUPS VALUES ("ICC205", "RBA1");