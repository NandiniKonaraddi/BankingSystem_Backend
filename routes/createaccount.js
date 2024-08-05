const express = require('express');
const router = express.Router();
const Create = require('../schema/createaccount');

router.post('/', async (req, res) => {
    const { username, firstName, lastName, mobileNumber, age, gender, panCardNumber, accountNumber, account, bankAccount, address, city, country, postalCode } = req.body;
    let person = await Create.findOne({ bankAccount,account });
    if (!person) {
        try {
            const person = new Create({
                username,
                firstName,
                lastName,
                mobileNumber,
                age,
                gender,
                panCardNumber,
                accountNumber,
                account,
                bankAccount,
                address,
                city,
                country,
                postalCode,
            });
            console.log(person)
            await person.save();
            res.status(201).json({ message: 'Account Details Saved Successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    else {
        return res.status(404).json({ message: 'Account Already found' });

    }
});


router.post('/get-accountupdate', async (req, res) => {
    const {firstName, lastName, mobileNumber, age, gender, panCardNumber, accountNumber, account, bankAccount, address, city, country, postalCode } = req.body;
    let person = await Create.findOne({ bankAccount,account });
    if (!person) { return res.status(404).json({ message: 'Account Not found' }); }
    else {
        try {
            person.firstName = firstName;
            person.lastName = lastName;
            person.mobileNumber = mobileNumber;
            person.age = age;
            person.gender = gender;
            person.panCardNumber = panCardNumber;
            person.accountNumber = accountNumber;
            person.address = address;
            person.city = city;
            person.country = country;
            person.postalCode = postalCode;
            person.account = account;
            person.bankAccount = bankAccount;
            await person.save();
            res.status(200).json({ message: 'Account updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
});
router.post('/get-account', async (req, res) => {

    const { username } = req.body;
    try {
        const profile = await Create.find({ username });
        if (!profile) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/get-accountdelete', async (req, res) => {

    const { accountNumber } = req.body;
    try {
        const profile = await Create.findOneAndDelete({ accountNumber });
        if (!profile) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: 'Account Deleted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/get-accountdetails', async (req, res) => {

    const { accountNumber } = req.body;
    try {
        const profile = await Create.findOne({ accountNumber });
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
