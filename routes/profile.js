const express = require('express');
const router = express.Router();
const Profile = require('../schema/personaldetails');

router.post('/', async (req, res) => {
    const { username, email, firstName, lastName, address, city, country, postalCode, aboutMe } = req.body;
    let person = await Profile.findOne({ email });
    if (!person) {
        try {
            const person = new Profile({
                username,
                email,
                firstName,
                lastName,
                address,
                city,
                country,
                postalCode,
                aboutMe
            });
            await person.save();
            res.status(201).json({ message: 'Personal Details Saved Successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    else {
        try {
            person.firstName = firstName;
            person.lastName = lastName;
            person.address = address;
            person.city = city;
            person.country = country;
            person.postalCode = postalCode;
            person.aboutMe = aboutMe;
            await person.save();
            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
});



router.post('/get-profile', async (req, res) => {
    console.log(req.body)
    const { email } = req.body;
    try {
        const profile = await Profile.findOne({ email });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
