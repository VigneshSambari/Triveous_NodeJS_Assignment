const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');

const connectDB = require("./database/db");
const userRoutes  = require("./routes/userRoutes");
const orderRoutes  = require("./routes/orderRoutes");
const categoryRoutes  = require("./routes/categoryRoutes");
const productRoutes  = require("./routes/productRoutes");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

const app = express();

// Apply the rate limiter to all requests
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Swagger Auth Example',
        description: "Please use postman if authentication doesnot work!",
        version: '1.0.0',
      },
      securityDefinitions: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    apis: ['./routes/*.js'], // Path to your route files
  };
  
  // Initialize Swagger-jsdoc
  const specs = swaggerJsDoc(options);
  
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


const PORT =  process.env.PORT || 5000;
connectDB();

app.get("/", (req, res) => {
    res.send("Connected...");
})


app.listen(PORT, "0.0.0.0", () => console.log("Connected to port 5000..."));