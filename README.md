# E-Commerce Application

This project is a full-stack e-commerce application built with React for the frontend and uses a JSON server as a mock backend. The application includes user authentication, product management, cart functionality, and an admin page.


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Folder Structure](#folder-structure)
5. [Pages and Components](#pages-and-components)
6. [API and Mock Data](#api-and-mock-data)
7. [Running the Application](#running-the-application)

## Project Overview

This e-commerce application allows users to:

- Register and login.
- Browse products.
- Add products to the cart.
- Checkout.
- Admins can manage products.

## Technologies Used

- **Frontend:** React, React Router, React Bootstrap
- **Backend:** JSON Server (mock API)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repository-url.git
cd your-repository-name
```

### 2. Install Dependencies
```bash
    npm install
```

### 3. Start the JSON Server
The project uses `json-server` to mock the backend API. Make sure you have `json-server` installed globally. If not, you can install it using:

```bash
npm install -g json-server
```
### 4. Configure and Start JSON Server
In the root directory of your project, start the JSON server with:
```bash
json-server --watch db.json --port 5000
```

## Folder Structure
Here is a high-level overview of the folder structure:

```bash
/your-repository-name
|-- /public
|   |-- index.html
|-- /src
|   |-- /components
|   |   |-- CartPage.jsx
|   |   |-- CheckOut.jsx
|   |   |-- ProductList.jsx
|   |-- /context
|   |   |-- AuthContext.js
|   |-- /pages
|   |   |-- AdminPage.jsx
|   |   |-- HomePage.jsx
|   |   |-- LoginPage.jsx
|   |   |-- CustomNavbar.jsx
|   |   |-- RegisterPage.jsx
|   |-- App.css
|   |-- App.js
|   |-- index.js
|-- package.json
|-- db.json
|-- README.md
```

## Pages and Components
- HomePage.jsx: Displays the product list and allows users to add products to the cart.
- LoginPage.jsx: Provides a login form for user authentication.
- RegisterPage.jsx: Allows users to register a new account.
- CartPage.jsx: Displays the contents of the user's cart and allows checkout.
- AdminPage.jsx: Admin interface for managing products.
- CheckOut.jsx: Handles the checkout process.
- CustomNavbar.jsx: Navigation bar with links to different pages.

## API and Mock Data
- The mock API is provided by json-server and uses the db.json file to store data for:

- Products: Product information including id, name, category, price, and image URL.
- Users: User data including id, username, password, and role.
- Cart: Items added to the user's cart.
- Orders: Order data including cart contents.

## Running the Application
- Start JSON Server: Run the command `npx json-server --watch db.json --port 5000` to start the mock backend server.
- Start React Application: In a separate terminal window, navigate to the project directory and run `npm start` to start the React application.
- Visit `http://localhost:3000` in your browser to see the application in action.

- Feel free to modify this `README.md` file to better suit your project's specific needs.

