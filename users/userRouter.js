const express = require('express');
const Users = require('./userDb');

const router = express.Router();

//postUser
router.post('/', (req, res) => {
    const { name } = req.body;
    if( !name ) {
        res.status(400).json({
            alert: "Alert! Provide name!"
        });
    }
    else {

        Users.insert(name)
        .then(user => { 
            res.status(201).json(user);
        })
        .catch(error => { 
            res.status(500).json({
                message: `Error creating user`,
                error
            })
        })
    }

});

//postUserID
router.post('/:id/posts', validateUserId, (req, res) => {
    const { id } = req.params;
    Users.insert(id)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => { 
        res.status(500).json({
            message: `Error creating user: ${error}`
        })
    })
});

//getUser
router.get('/', (req, res) => {
    Users.get()
    .then(users => { 
        res.status(201).json(users)
    })
    .catch(error => { 
        res.status(500).json({ 
            message: `The User could not be retrieved: ${error}`
        })
    })

});

//getUserId
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Users.getById(id)
    .then(users => { 
        return users.length
        ?
        res.status(200).json(users)
        : 
        res.status(404).json({
            message: "User with the specified ID does not exist."
        });
    })
    .catch((error) => {
        return res.status(500).json({
            message: `The User could not be retrieved: ${error}`
        });
    });
});

//getUserPostById
router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    Users.getUserPosts(id)
    .then(users => { 
        return users.length
        ?
        res.status(200).json(users)
        : 
        res.status(404).json({
            message: "Post with the specified ID does not exist."
        });
    })
    .catch((error) => {
        return res.status(500).json({
            message: `The Post could not be retrieved: ${error}`
        });
    });

});


//deleteUserById
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    Users.remove(id)
    .then( count => { 
        return (count > 0)
        ?
        res.status(200).json({
            message: "User successfully deleted"
        })
        :
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    })
    .catch(error => {
        res.status(500).json({ 
            message: `Could not delete User: ${error}`
        })
    })

});

//updateUserbyId
router.put('/:id', (req, res) => {
    const changes = req.body;
    const { text } = changes;
    const { id } = req.params;
    Users.update(id, changes)
    .then(users => { 
        if(users) {
            res.status(200).json(users);
        }
        else if (!text) {
            res.status(400).json({
                errorMessage: `Provide text for the user post. ${text} invalid!`
            })
        } 
        else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((error) => { 
        res.status(500).json({
            message: `The user post could not be modified: ${error}`
        })
    })

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;

    if(parseInt(id) > 0) { 
        next();
    } else { 
        res.status(400).json({
            message: "User ID must be valid number"
        });
    }
}

function validateUser(req, res, next) {


};

function validatePost(req, res, next) {

};

module.exports = router;
