-- Upload this SQL file into your MySQL system

CREATE DATABASE CDW_BANK;
USE CDW_BANK;

-- Tables 

CREATE TABLE CDW_BANK.EMPLOYEES (employeeId VARCHAR(10), firstName VARCHAR(50), lastName VARCHAR(50), email VARCHAR(50), accountStatus char(1));
CREATE TABLE CDW_BANK.ENTITLEMENTS (groupId VARCHAR(10), groupName VARCHAR(50), groupDescription VARCHAR(400));
CREATE TABLE CDW_BANK.USER_GROUPS (employeeId VARCHAR(10), groupId VARCHAR(10));

-- Account and entitlement information

INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK21010", "Ajinkya", "Rahane", "rahane@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK19007", "Devdutt", "Padikal", "padikal@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK23002", "Mayank", "Agarwal", "mayanka@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK23001", "Rashid", "Khan", "rashidk@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK23003", "Ruturaj", "Gaikwad", "rutug@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK22009", "Shardul", "Thakur", "shardul@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK19008", "Shivam", "Dube", "shivam@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK23005", "Shubman", "Gill", "sara@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK20006", "Suryakumar", "Yadav", "skyadav@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK23004", "Yuzvendra", "Chahal", "yuzi@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK09012", "Virat", "Kohli", "kohli@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK20014", "Ishan", "Kishan", "ishanshub@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK18013", "Mohammed", "Shami", "shami@cdw.com", "A");
INSERT INTO CDW_BANK.EMPLOYEES VALUES ("BNK00011", "Mahendra Singh", "Dhoni", "mahi@cdw.com", "A");

INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA1", "Customer Service Representative", "Access to customer accounts for support purposes, transaction processing for customers, addressing account-related inquiries, and providing support via various communication channels.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA2", "Teller", "Similar to CSR with additional permissions for handling cash transactions, including deposits, withdrawals, cashing checks, and managing physical transactions within the bank branch.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA3", "System Administrator", "User account management, system configurations, troubleshooting technical issues, and ensuring the overall functionality and security of the banking website.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA4", "Financial Advisor", "Access to client accounts, investment portfolios, financial planning tools, trading capabilities, and resources to manage and advise on clients' finances.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA5", "Loan Officer", "Access to loan application systems, customer financial information, credit history, permissions to process and manage loan applications within specified limits.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA6", "Branch Manager", "Similar to CSR and Teller roles with added administrative permissions, oversight of branch operations, managing staff, and authorizing certain transactions or exceptions.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA7", "Operations Manager", "Access to tools or systems that allow them to monitor and oversee operational processes, Permissions to manage departmental resources, including assigning tasks to staff and ensuring proper allocation of resources to meet operational needs.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA8", "Accountant", "Access to financial data, managing ledger entries, reconciling accounts, financial reporting, and compliance with accounting standards.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA9", "Auditor","Access to audit trails, conducting internal audits, ensuring compliance with internal policies and regulations.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA10", "Mobile App Developer","Developing and maintaining mobile banking applications, ensuring UX, security, and functionality.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA11", "Credit Analyst","Access to Credit reports, borrower information, and credit risk assessment data, Assessing creditworthiness, analyzing credit reports.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA12", "Treasury Manager","Access to Cash flow data, treasury management reports, investment portfolios, and banking relationships data to manage cash flow, oversee financial assets, and execute investment transactions..");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA13", "Legal Counsel","Access to Legal documents, regulatory filings, contracts, litigation records, and legal compliance reports to provide legal advice, ensure compliance, and handle legal matters.");
INSERT INTO CDW_BANK.ENTITLEMENTS VALUES ("RBA14", "Investment Banker","Access to Corporate financial data, mergers and acquisitions data, investment portfolios, and market research reports");

INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK21010", "RBA3");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK19007", "RBA1");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK23002", "RBA7");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK23001", "RBA6");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK23003", "RBA2");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK22009", "RBA10");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK19008", "RBA8");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK23005", "RBA5");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK20006", "RBA6");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK23004", "RBA4");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK09012", "RBA10");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK20014", "RBA3");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK18013", "RBA7");
INSERT INTO CDW_BANK.USER_GROUPS VALUES ("BNK00011", "RBA9");