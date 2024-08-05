const express = require('express');
const router = express.Router();
const Credit = require('../schema//credit-debit');
const Create = require('../schema/createaccount');
const History = require('../schema/transactionhistory');

router.post('/get-accountNumber', async (req, res) => {
    let obj = {}
    obj['bankAccount'] = req.body.bankAccount
    obj['account'] = req.body.selectedBankAccount
    try {
        const profile = await Create.findOne(obj);
        if (!profile) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/deposit', async (req, res) => {
    if (req.body.category == 'Deposit') {
        req.body.transactionType = 'Credit'
    } else req.body.transactionType = 'Debit'

    const { amount, date, description, category, bankAccount, account, accountNumber, transactionType } = req.body;
    console.log( bankAccount, account)
    let person = await Credit.findOne({ bankAccount, account });
    console.log(person)
    if (!person) {
        try {

            const person = new Credit({ amount, date, description, category, bankAccount, account, accountNumber, transactionType });
            const history = new History({ amount, date, description, category, bankAccount, account, accountNumber, transactionType })
            await person.save();
            await history.save();
            res.status(201).json({ message: 'Amount Deposite Successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    else {
        console.log("sdfghjkl")
        try {
            let value = parseFloat(amount)
            let amt;


            if (transactionType == 'Credit') {
                amt = (person.amount + value)
            } else {
                amt = (person.amount - value)
            }
            person.amount = amt;
            person.accountNumber = accountNumber;
            person.date = date;
            person.description = description;
            person.category = category;
            person.bankAccount = bankAccount;
            person.account = account;
            person.transactionType = transactionType;
            await person.save();
            const history = new History({ amount, date, description, category, bankAccount, account, accountNumber, transactionType })
            await history.save();
            res.status(200).json({ message: 'Account updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }

    }
});
module.exports = router;