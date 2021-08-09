const express = require('express');
const Joi = require('joi');
const Transaction = require('./Transaction');
const Transactions = require('./Transactions')
const Statistics = require('./Statistics');

require('dotenv').config();

const PORT = process.env.PORT || 4000;


const app = express();
app.use(express.json())

Transactions.checkTransactionSixtySecondsLess();


app.post('/transaction', (req, res) => {
    const schema = Joi.object({
        amount: Joi.number().required(),
        timestamp: Joi.string().isoDate().required()
    })

    const validationErr = schema.validate(req.body)

    if (validationErr.error) {
        return res.status(422).json({
            status: false,
            message: `Validation Error: ${validationErr.error.message}`,
        })
    }

    const transaction = new Transaction(req.body.amount, req.body.timestamp);
    const currentTime = new Date().getTime();


    if (transaction._milliseconds > currentTime) {
        return res.status(422).json({
            status: false,
            message: `Transaction date is in the future`,
        })
    }

    const sixtySecondsAgo = new Date(Date.now() - 60000).getTime();

    if (transaction._milliseconds < sixtySecondsAgo) {
        return res.status(204).json({
            status: false,
            message: `transaction is less than 60 seconds`,
        })
    }


    Transactions.save(transaction);

    return res.status(200).json({ status: true, message: 'Transaction created successfully' })
})

app.get('/transactions', (req, res) => {
    return res.status(200).json({ status: true, message: 'Transaction retrieved successfully', transactions: Transactions.transactions })
})

app.get('/statistics', (req, res) => {
    return res.status(200).json({
        sum: Statistics.sum,
        avg: Statistics.avg,
        max: Statistics.max,
        min: Statistics.min,
        count: Statistics.count,
    })
})

app.delete('/transactions', (req, res) => {
    Transactions.clear();
    return res.status(204).json({
        status: true,
        message: 'Transactions deleted'
    });
})


app.listen(PORT, () => console.log(`App listening on ${PORT}`))