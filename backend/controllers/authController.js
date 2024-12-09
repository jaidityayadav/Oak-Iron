const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { z } = require("zod");

const signup = async (req, res) => {
    const requiredBody = z.object({
        name: z.string().min(3).max(50),
        email: z.string().email().min(3).max(50),
        password: z.string().min(5).max(30),
    });
    
    const zodSuccess = requiredBody.safeParse(req.body);

    if (!zodSuccess.success) {
        return res.status(400).json({
            message: "Incorrect input",
            errors: zodSuccess.error.errors.map((err) => err.message)
        });
    }

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.json({
                message: "User already exists",
            });
        } else {
            await userModel.create({ name, email, password: hashedPassword });
            return res.json({
                success: true,
                message: "Signed up",
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "error signing up, please try again",
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User doesn't exist",
        });
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (!result) {
            return res.json({
                message: "Wrong password",
            });
        }
        const token = jwt.sign(
            {
                id: user._id.toString(),
            },
            process.env.user_secret_key
        );

        res.json({
            success: true,
            token: token,
        });
    });
};

module.exports = { signup, login };
