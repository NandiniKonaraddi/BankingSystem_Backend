const express = require('express');
const router = express.Router();
const Credit = require('../schema//credit-debit');
const History = require('../schema/transactionhistory');

router.post('/get-accountNumber', async (req, res) => {
    let obj = {}
    obj['bankAccount'] = req.body.bankAccount
    obj['account'] = req.body.selectedBankAccount
    try {
        const profile = await Credit.findOne(obj);
        if (!profile) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/get-accountHistory', async (req, res) => {
    try {
        const { bankAccount, account } = req.body;
        const profile = await History.find({bankAccount,account});
        if (!profile) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;