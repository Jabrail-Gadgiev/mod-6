const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel.js');

router.post('/registration',
    function(req, res) {

        let newDocument = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'password': req.body.password,
            'subscription': req.body.subscription
        };
        
        UserModel
        .create(newDocument)
        // If MongoDB creates document successfully, then...
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        // Otherwise, if an error occurs, catch it...
        .catch(
            function(error) {
                console.log('/registration error', error)
                res.send('An error occured')
            }
        );

    }
);

router.post('/find',
    function(req, res) {
        UserModel
        .find(
            // {"lastName": req.body.lastName}
        )
        .then(
            function(dbDocument) {
                res.json(dbDocument);
            }
        )
        .catch(
            function(error) {
                console.log('/find error', error);
                res.send('An error occured');
            }
        )
    }
);

router.put(
    '/update',
    function(req, res) {

        let newDocument = {};

        if (req.body.firstName) {
            newDocument['firstName'] = req.body.firstName;
        };
        if (req.body.lastName) {
            newDocument['lastName'] = req.body.lastName;
        };
        if (req.body.phone) {
            newDocument['phone'] = req.body.phone;
        };

        UserModel
        .findOneAndUpdate(
            {
                'email': req.body.email
            },
            {
                $set: newDocument
            },
            {
                new: true
            }
        )
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {
                console.log('/users/update error', error);
                res.send('An error occured');
            }
        )
    }
);

router.put(
    '/preferences',
    function(req, res) {
        let newDocument = {};

        if (req.body.subscription) {
            newDocument['subscription'] = req.body.subscription;
        };

        UserModel
        .findOneAndUpdate(
            {
                '_id': req.body._id
            },
            {
                $set: newDocument
            },
            {
                new: true
            }
        )
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {
                console.log('/users/update error', error);
                res.send('An error occured');
            }
        )
    }
)

module.exports = router;