# Expense Tracker 💰

A full-stack web application that helps you track your finances. You can **add**, **edit**, and **delete** transactions to manage both **income** and **expense** records. The app is **responsive**, so it works smoothly on both **desktop** and **mobile** devices. Built with **HTML**, **CSS**, **JavaScript**, **Bootstrap**, **MySQL**, and **PHP**.

## Demo Video 🎥
https://drive.google.com/file/d/14FXeFvcZNJJW2K6ScU7qHICKpwO3kAYf/view?usp=sharing

## Features 🛠️
- **Add Transaction**: Add income and expense records with details like amount, category, and date.
- **Edit Transaction**: Edit existing transactions as needed.
- **Delete Transaction**: Remove any transaction.
- **Track Your Money**: View your transaction history in a neat and organized list.
- **Responsive Design**: Designed to work across desktop, tablet, and mobile devices.

## Technologies Used 🖥️
- **Frontend**:
  - HTML
  - CSS
  - JavaScript
  - Bootstrap (for responsive design)
- **Backend**:
  - PHP
  - MySQL (for database management)

## Setup Instructions 🚀

### Backend Setup (PHP & MySQL)
1. Install [XAMPP](https://www.apachefriends.org/index.html) (includes Apache and MySQL) on your machine.
2. Download or clone this repository to your local machine.
3. Place the **Backend** files (like `add_transactions.php`, `db.php`, `delete_transactions.php`, etc.) in the `htdocs` directory of your XAMPP installation.
4. Open the **XAMPP Control Panel**, and start the **Apache** and **MySQL** services.
5. Create a MySQL database and tables as required. You can refer to the schema in `db.php` or other included files.
6. Update the `db.php` file with your MySQL credentials (username and password).

### Frontend Setup (HTML, CSS, JS, Bootstrap)
1. After setting up the backend, open the **frontend** folder.
2. You can open the **userLogin.html** file directly in your browser or configure a local server.
   
### Running the Application 🔧
1. Start **Apache** and **MySQL** from the **XAMPP Control Panel**.
2. Open your browser and go to [http://localhost/expense-tracker/frontend/userLogin.html](http://localhost/expense-tracker/frontend/userLogin.html) to access the application.
3. Use the following credentials to test:
   - **Email**: `user@test.com`
   - **Password**: `user`
4. You can now add, edit, or delete transactions and track your finances.




