const express = require ('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

//Connect database
connectDB();

//Init MiddleWare
app.use(express.json({extened:false}));

app.use(cors());
app.get('/',(req,resp)=> resp.send('API running'));

//Define Routes
app.use('/api/fetchevent', require('./routes/api/fetchevent'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));