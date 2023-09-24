import express from 'express';
import { insertUser, login, inssertRole, insertPermission, getRoles, getUsers, getPermission } from '../controllers/user.js';
import { auth } from '../middleware/auth/auth.js';
import { error } from 'console';
import "reflect-metadata"

const router = express.Router();

// router.post('/', (req, res) => {
//     insertUser(req.body).then(() => {
//         res.status(201).send()
//     }).catch(error => {
//         console.error(error)
//         res.status(500).send(error)
//     })
// })

router.post('/createUser', (req, res) => {
    const { email, password, userName, displayName, role } = req.body
    if (email && password && userName && displayName && role) {
        insertUser(req.body).then(() => {
            res.status(201).json("user created successfully")
        }).catch(error => {
            console.error(error)
            res.status(500).send(error)
        })
    } else {
        res.status(400).send('complete all what you need ...')
    }
})

router.get('/', auth, (req, res, next) => {
    getUsers().then(data => {
        res.status(200).send(data)
    }).catch(error => {
        res.status(404).send(error)
    })
});


router.post('/permission', (req, res) => {
    insertPermission(req.body).then(() => {
        res.status(201).send(`Create Permission successfully`)
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

router.get('/permission', auth, (req, res, next) => {
    getPermission().then((data) => {
        res.status(200).send(data)
    }).catch(err => {
        console.error(err);
        res.status(500).send("there are wrong permissions")
    })
})

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password;
    login(email, password)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(401).send(err)
        })
})

router.get('/roles', auth, async (req, res, next) => {
    try {
        const roles = await getRoles()
        res.send(roles)
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})

router.post('/role', (req, res) => {
    inssertRole(req.body).then(() => {
        res.status(201).send(`Created roles successfully`)
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

export default router