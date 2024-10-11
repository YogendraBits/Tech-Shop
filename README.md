> Tech Shop built with the MERN stack & Redux - By Team 6
> 
> Standard Naming Conventions are Used , so you can take help of A.I. tools like ChatGpt , Gemini e.t.c to understand and enhance the product.

## Features

- Full featured shopping cart
- Product reviews and ratings  (Edit and Delete Reviews)
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders and Delete account feature
- Admin product management (Create ,Edit , Delete)
- Admin user management (Edit, Admin Status and Delete)
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping,Select Address, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)
- User Wishlist Products (Add,Delete)
- User Addresses (Add , edit , delete)
- AI Integration (can Chat with two models - Gemini and Groq)
- API with postman testing code 

## Usage

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error
You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = "your mongodb uri"
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = "your paypal client id"
API_KEY="Your Gemini Api Key"
GROQ_API_KEY="Your Groq APi Key"
```
Note: If you don't add your paypal id , project will still work but the payment feature won't.

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed  Database
You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

yogendra@example.com (Customer)
123456
```

