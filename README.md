# HR Management System

## Installation Requirement:
1. Node js must be installed in your pc or download from here https://nodejs.org/dist/v16.13.2/node-v16.13.2-x64.msi and install
2. Xampp must be installed in your pc or download from here https://www.apachefriends.org/index.html and install
3. VS Code or any other editor.
4. Git installed in your pc or download from here https://git-scm.com/ and install (not mandatory)

## Installation Process:
### Step-1
- start xampp apache server and mysql server
- create a database in mysql

### Step-2
- open your cmd prompt
- type `git clone https://github.com/wdmahbubur/hr-management-system.git` 
- or download zip file from github and extract

### Step-3
- type 
- type `cd backend`
- type `npm install`
- automatically install all dependence
- create a .env file in backend folder
- type `DATABASE_HOST=localhost`
        `DATABASE_USERNAME= //write your mysql database username`
        `DATABASE_PASSWORD= //write your mysql database password`
        `DATABASE_NAME= //write your mysql database name`
        `MAILTRAP_PORT= //write your mailtrap port number`
        `MAILTRAP_USER= //write your mailtrap user`
        `MAILTRAP_PASS= //write your mailtrap user`
- type `npm run start`

### Step-4
- open another cmd command prompt
- goto project folder
- then type `cd frontend`
- type `npm install`
- type `npm start`
- automatically project open in your browser

## Features
- HR manage all employees
- Create new employee
- Upload employee csv file
- HR send mail to selected employee
- Employee select by checkbox
- Pagination
- Responsive & Mobile friendly


