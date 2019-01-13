import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import auth from './routes/auth';

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('failed to connect to mongo');
        console.log('ERROR', err);
        
    } else {
        console.log('Successfully connected to db');
    }
})

app.use('/api/auth', auth);


app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, () => console.log("running on localhost:3000"))