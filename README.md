# ecommerce-store-api

This is an eCommerce project for building a backend API server using Node.js, Express, and MongoDB. It provides a set of API endpoints to manage user accounts, products, orders, and various eCommerce functionalities.

## Getting Started

### Prerequisites

To run this project, you need to have the following software installed:

- Node.js (version >= 12.0.0)
- MongoDB (running instance or connection URI)

### Installation

1. Clone the repository:
```
git clone https://github.com/kunalarora0930/ecommerce-store-api.git
```
2. Install the dependencies:
```
cd ecommerce-backend-api
npm install
```
3. Set up environment variables:

- Create a `.env` file in the project root directory.
- Define the required environment variables in the `.env` file (e.g., database connection URI, JWT secret, etc.).

4. Start the server:
```
npm start
```
The server will start running at `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- User endpoints: `/api/users`
  - User signup: `POST /api/users/signup`
  - User login: `POST /api/users/login`

- Product endpoints: `/api/products`
  - Get all products: `GET /api/products`
  - Get a single product: `GET /api/products/:id`
  - Create a new product: `POST /api/products`
  - Update a product: `PUT /api/products/:id`
  - Delete a product: `DELETE /api/products/:id`

- Order endpoints: `/api/orders`
  - Get all orders: `GET /api/orders`
  - Get a single order: `GET /api/orders/:id`
  - Create a new order: `POST /api/orders`
  - Update an order: `PUT /api/orders/:id`
  - Delete an order: `DELETE /api/orders/:id`

- Other endpoints: Categories, Wishlist, Cart, Reviews, Shipping, Payment, Analytics

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.
