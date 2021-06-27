const User = require("../models/UserModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.getUserList = (req, res) => {
    User.find().select('name phone email')
        .then(user => {
            if (!user) {
                res.status(400).json({
                    success: false,
                    message: "Error Bad Request"
                })
            }
            res.status(200).json({
                success: true,
                message: "Success Request",
                users: user
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Error Internal Server Error",
                error: err
            })
        })

}


module.exports.registerUser = (req, res) => {

    let Users = new User({
        name: req.body.name,
        email: req.body.email,
        color: req.body.color,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })

    Users.save()
        .then(user => {
            res.status(201).json({
                success: true,
                message: "Register User",
                user: user
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Failed register",
                error: err
            })
        })

}


module.exports.login = (req, res) => {

    const secret = process.env.secret

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Not Found User"
                })
            } else if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
                const token = jwt.sign({
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                    secret,
                    {
                        expiresIn: '1d'
                    }
                )

                const users = ({ email: user.email, token: token })

                return res.status(200).json({
                    succes: true,
                    message: "Login Successfully",
                    users: users
                })
            } else {
                return res.status(400).json({
                    succes: false,
                    message: "Password Wrong",
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Error Internal Server Error",
                error: err
            })
        })
}


module.exports.userCount = async (req, res) => {

    const userCount = await User.countDocuments((count) => count);

    if (!userCount) {
        return res.status(500).json({
            success: false,
            message: "500 Internal Server Error"
        })
    }

    res.status(200).json({
        success: true,
        userCount: userCount
    })

}


module.exports.removeUser = (req, res) => {

    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User Not found"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Success Delete User"
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "500 Internal Server Error",
                error: err
            })
        })

}


module.exports.detailUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Detail User ",
                users: user
            })

        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: `Internal Server Error`,
                error: err
            })
        })
}