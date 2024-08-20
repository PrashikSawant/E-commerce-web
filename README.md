
# E-Commerce Website Project


Welcome to the E-Commerce Website project! This Node.js-based application provides a platform for online sales, allowing users to register, log in, and perform various actions related to product management and purchasing. Below, you’ll find instructions on how to set up and use this project.




## Features

1. User Registration and Login:

- Users can create an account by registering with their email and password.
- Once registered, users can log in securely using their credentials.
2. Admin Panel:
Admin users have additional privileges:
- Manage product details (add, edit, delete products)
- monitor sales and user activity.
3. Customer Experience:
Customers can:
- Browse products.
- Add products to their cart.
- Proceed to checkout.
- View order history.
4. Database Integration:
- User information (username and encrypted password) is stored in a MySQL database.
- Product details are also stored in the database.



## Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- MySQL (with a database set up for this project)
## Installation

1. Clone this repository to your local machine:

```bash
  git clone https://github.com/PrashikSawant/E-commerce-web/tree/master

```
2. Install dependencie

``` 
npm install

```
3. Set up your MySQL database:
- Create a new database (e.g., ecommerce_db).
- Update the database configuration in config/db.js with your database credentials.

4. Start the server:
```
nodemon app.js

```

## Usage/Examples

1. Access the application in your web browser at http://localhost:3000.
2. Register or log in as a user (customer).
3. Explore the features:
- Admin Panel: Manage products.
- Customer Dashboard: Browse products, add to cart, and place orders.

