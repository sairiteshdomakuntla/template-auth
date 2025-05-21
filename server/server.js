// const express = require('express');
// const app = express();
// require('dotenv').config();
// const mongoose = require('mongoose');
// const cors=require('cors');

// // Enable CORS
// app.use(cors());

// // Parse JSON bodies
// app.use(express.json());


// const port = process.env.PORT || 3000;


// mongoose.connect(process.env.DB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("DB connection error:", err));


// // Routes
// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// app.listen(port,()=>console.log(`Server is listening on port ${port}...`));








const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');



// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, this is protected data!` });
});


// Env check
if (!process.env.DB_URI) {
  console.error("❌ DB_URI not set in .env");
  process.exit(1);
}

// Connect to DB
mongoose.connect(process.env.DB_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ DB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
