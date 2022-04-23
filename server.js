import express from 'express';
import { readdirSync } from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');
require("dotenv").config();

const app = express();

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// DB connection
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB Connection Successful..."))
    .catch((err) => console.log("DB Connection Error: ", err));

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// route middleware
readdirSync('./routes').map((r) =>
    app.use('/api', require(`./routes/${r}`))
);

const port = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(port, () => console.log(`Server is running on port ${port}...`));

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
});