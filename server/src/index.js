require('./models/User');
require('./models/Post');
require('./models/Message');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes, dataRoutes); // use our authentication and data scheme

const mongoUri = 'mongodb+srv://admin:z7vmd2F4bmZL@cluster0.54ejc.mongodb.net/p2p?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    // todo_log: add statement
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    // todo_log: add statement
    console.error('Error connecting to mongo', err);
});

// is this protecting it?
app.get('/', requireAuth, (req,res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    // todo_log: add statement
    console.log('Listening on port 3000');
});
