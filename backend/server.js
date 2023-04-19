const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors')
const { init } = require('./socket')
const errorHandler = require('./middlewares/errorHandler')

const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/plc'));

app.use(errorHandler);
const server = app.listen(port, () => {
    console.log("Server runnig on port "+ port)
})

const options = {
    cors: true,
    origin: ['http://localhost:3000']
}

const io = init(server, options);

io.on('connection', (socket) => {
    console.log('connected')
})
