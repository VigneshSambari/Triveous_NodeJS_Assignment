# Triveous_NodeJS_Assignment

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Swagger API Documentation](#swagger-api-documentation)
  - [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

This Node.js backend serves as the core of the e-commerce application. It provides endpoints for managing products, orders, authentication, and more made for completing Triveous assignment.

## Features

- **Product Management**: CRUD operations for managing products.
- **Order Handling**: Create, view, and manage orders.
- **Cart Management**: Add, view, update quantities, and remove items from the cart.
- **User Authentication**: Register, log in, and obtain JWT for authentication.
- **API Documentation**: Easily explore the API using Swagger documentation.
- **Rate Limiting**: API rate limiting is implemented to prevent abuse and maintain server stability.

### Swagger API Documentation

Explore the API endpoints and their details using the [Swagger Documentation](http://localhost:5000/api-docs/).
Do this after starting the server locally.

### API Endpoints

The backend includes the following API endpoints:

- Category Listing
- Product Listing
- Product Details
- Cart Management
- Order Placement
- Order History
- Order Details
- User Registration and Login

For detailed information about each endpoint, refer to the [API Documentation](http://localhost:5000/api-docs/).

## Installation

To run the code locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory in your terminal.
3. Run the following command to install dependencies:

   ```bash
   npm install
4. Start the server using:
    ```bash
   npm run server
 
## Usage
Use postman or any other api-calling tools to make Authenticated requests(e.g., accessing the cart, ordering etc.).
To open documentation open "http://localhost:5000/api-docs/" after starting the server.