const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const locationRoute = require('./routes/locationRoute')
const businessRoute = require('./routes/businessRoute')
const roomRoute = require('./routes/roomRoute')
const bookingRoute = require('./routes/bookingRoute')
const recommendationRoute = require('./routes/recommendationRoute')
const userCollectionRoute = require('./routes/userCollectionRoute')
const uploadImageRoute = require('./routes/uploadImageRoute')
const invoiceRoute = require('./routes/invoiceRoute')
const paymentRoute = require('./routes/paymentRoute')
const serviceRoute = require('./routes/serviceRoute')
const messageRoute = require('./routes/messageRoute')
const reviewRoute = require('./routes/reviewRoute')
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const {errorHandler} = require('./middleware/errorMiddleware')

// const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3000"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },

    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",

    credentials: true, // Cho phép gửi cookie
    allowedHeaders: "Content-Type, Authorization"
}));

//View engine
app.set('view engine', 'ejs')

//Database connection

const mongoURL = "mongodb+srv://thinhnguyenphuc:6RUfHulVdn6qLyO8@thinhnguyenphuc.dxqeq.mongodb.net/TravelSocial?retryWrites=true&w=majority&appName=thinhnguyenphuc";
mongoose.connect(mongoURL)
    .then(console.log("Db is connected"))
    .catch(error => console.log(error));

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT)
})


//Route
//app.get('*', checkUser)

app.get('/', (req, res) => {
    res.status(200).json({
        isSuccess: true,
        message: 'Welcome to the homepage',
    });
});
app.get('/signup', (req, res) => {res.render('signup')})
app.get('/signin', (req, res) => {res.render('signin')})
app.get('/set-cookie', (req, res) => {
    res.setHeader('Set-Cookie', 'newUser=true');
    res.send('u have cookies')
})

app.use(authRoute)
app.use(locationRoute)
app.use(roomRoute)
app.use(bookingRoute)
app.use(userCollectionRoute)
app.use(serviceRoute)
app.use(paymentRoute)
app.use(reviewRoute)
app.use(invoiceRoute)

app.use(errorHandler)