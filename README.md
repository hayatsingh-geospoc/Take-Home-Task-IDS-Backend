# E-commerce Backend API

A NestJS-based e-commerce backend API using GraphQL and MongoDB.

## Features

- Product catalog with pagination
- Shopping cart management
- Order processing
- JWT Authentication

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd your-project-name
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://amit_singh:kya_hal_hai_tere@cluster0.jpqo2bq.mongodb.net/shop
JWT_SECRET=your-secret-key
```

4. Start the server:
```bash
npm run start:dev
```

The server will be running at `http://localhost:3000/graphql`

## API Documentation

### Authentication

First, get a JWT token:
```bash
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-d '{
  "query": "mutation { login }"
}'
```

Use the returned token in subsequent requests:
```bash
TOKEN="your-jwt-token"
```

### Product Operations

1. Create Product:
```bash
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-d '{
  "query": "mutation { 
    createProduct(
      name: \"Gaming Laptop\", 
      description: \"High-end gaming laptop\", 
      price: 1299.99, 
      stock: 10
    ) { 
      id 
      name 
      description 
      price 
      stock 
    } 
  }"
}'
```

2. Get All Products:
```bash
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "query": "query { 
    getProducts(page: 1, limit: 10) { 
      id 
      name 
      description 
      price 
      stock 
    } 
  }"
}'
```

3. Get Single Product:
```bash
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "query": "query { 
    getProduct(id: \"PRODUCT_ID\") { 
      id 
      name 
      description 
      price 
      stock 
    } 
  }"
}'
```

### Cart Operations

1. View Cart:
```bash
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "query": "query { 
    getCart { 
      items { 
        product { 
          id 
          name 
          price 
        } 
        quantity 
      } 
      total 
    } 
  }"
}'
```

2. Add to Cart:
```bash
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "query": "mutation { 
    addToCart(productId: \"PRODUCT_ID\", quantity: 1) { 
      items { 
        product { 
          name 
          price 
        } 
        quantity 
      } 
      total 
    } 
  }"
}'
```

3. Remove from Cart:
```bash
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "query": "mutation { 
    removeFromCart(productId: \"PRODUCT_ID\") { 
      items { 
        product { 
          name 
        } 
        quantity 
      } 
      total 
    } 
  }"
}'
```

### Order Operations

1. Create Order (Checkout):
```bash
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "query": "mutation { 
    checkout { 
      id 
      items { 
        product { 
          name 
          price 
        } 
        quantity 
      } 
      totalPrice 
      date 
    } 
  }"
}'
```

2. View Orders:
```bash
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "query": "query { 
    getOrders { 
      id 
      items { 
        product { 
          name 
          price 
        } 
        quantity 
      } 
      totalPrice 
      date 
    } 
  }"
}'
```

## Project Structure

```
src/
├── auth/                 # Authentication related files
├── graphql/             # GraphQL type definitions
├── interfaces/          # TypeScript interfaces
├── modules/             # Feature modules
├── resolvers/           # GraphQL resolvers
├── schemas/             # MongoDB schemas
├── services/            # Business logic
└── app.module.ts        # Main application module
```

## Testing

Run the tests:
```bash
npm run test
```

## Error Handling

The API returns appropriate error messages for:
- Invalid authentication
- Insufficient stock
- Invalid product IDs
- Empty cart checkout attempts

## Notes

- Replace `PRODUCT_ID` with actual product IDs from your database
- Always include the Authorization header for protected routes
- The token expires after 24 hours

## License

MIT

## Dependencies

### Core Dependencies
```json
{
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/platform-express": "^10.0.0",
  "@nestjs/graphql": "^12.0.11",
  "@nestjs/apollo": "^12.0.11",
  "apollo-server-express": "^3.13.0",
  "graphql": "^16.8.1",
  "reflect-metadata": "^0.1.13"
}
```

### Database
```json
{
  "@nestjs/mongoose": "^10.0.2",
  "mongoose": "^7.6.7"
}
```

### Authentication
```json
{
  "@nestjs/jwt": "^10.2.0",
  "@nestjs/passport": "^10.0.3",
  "passport": "^0.7.0",
  "passport-jwt": "^4.0.1",
  "@types/passport-jwt": "^4.0.0"
}
```

### Development Dependencies
```json
{
  "@nestjs/cli": "^10.0.0",
  "@nestjs/schematics": "^10.0.0",
  "@nestjs/testing": "^10.0.0",
  "@types/express": "^4.17.17",
  "@types/jest": "^29.5.2",
  "@types/node": "^20.3.1",
  "@types/supertest": "^2.0.12",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "eslint": "^8.42.0",
  "eslint-config-prettier": "^9.0.0",
  "eslint-plugin-prettier": "^5.0.0",
  "jest": "^29.5.0",
  "prettier": "^3.0.0",
  "source-map-support": "^0.5.21",
  "supertest": "^6.3.3",
  "ts-jest": "^29.1.0",
  "ts-loader": "^9.4.3",
  "ts-node": "^10.9.1",
  "tsconfig-paths": "^4.2.0",
  "typescript": "^5.1.3"
}
```

### Complete package.json
```json
{
  "name": "e-commerce-api",
  "version": "0.0.1",
  "description": "E-commerce backend API using NestJS, GraphQL and MongoDB",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/graphql": "^12.0.11",
    "@nestjs/apollo": "^12.0.11",
    "@nestjs/mongoose": "^10.0.2",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "apollo-server-express": "^3.13.0",
    "graphql": "^16.8.1",
    "mongoose": "^7.6.7",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "reflect-metadata": "^0.1.13"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/passport-jwt": "^4.0.0",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  }
}
```

These dependencies are organized into several categories:
- Core NestJS and GraphQL dependencies
- Database dependencies for MongoDB integration
- Authentication dependencies for JWT and Passport
- Development dependencies for testing, linting, and TypeScript support

To install all dependencies, run:
```bash
npm install
```

For development only dependencies:
```bash
npm install --save-dev
```