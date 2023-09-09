import express from 'express';
import { insertUser, login, inssertRole, insertPermission, getRoles, getUsers } from '../controllers/user.js';
import { auth } from '../middleware/auth/auth.js';
import { error } from 'console';

const router = express.Router();

router.post('/', (req, res) => {
    insertUser(req.body).then(() => {
        res.status(201).send()
    }).catch(error => {
        console.error(error)
        res.status(500).send(error)
    })
})

router.post('/role', (req, res) => {
    inssertRole(req.body).then((data) => {
        res.status(201).send(data)
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

router.post('/permission', (req, res) => {
    insertPermission(req.body).then((data) => {
        res.status(201).send(data)
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

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

router.get('/', auth, (req, res, next) => {
    getUsers().then(data => {
        res.status(200).send(data)
    }).catch(error => {
        res.status(404).send(error)
    })
});

export default router;