import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../modules/User.js'; // Ensure the correct path to your User model

const router = express.Router();
const SECRET_KEY = '!@#$%^&*()'; // Use a more secure key in production

// Password validation function
const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const upperCaseRegex = /[A-Z]/;

    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }
    if (!specialCharRegex.test(password)) {
        return "Password must include at least one special character";
    }
    if (!upperCaseRegex.test(password)) {
        return "Password must include at least one uppercase letter";
    }
    return null;
};


// User registration
export const register = async (req, res) => {
    const { name, gmail, password } = req.body;

    try {
        // Validate password
        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        let user = await User.findOne({ gmail });

        if (user) return res.status(400).json({ message: "User already exists" });

        const hashPass = await bcrypt.hash(password, 10);

        user = await User.create({ name, gmail, password: hashPass,role: 'us' });

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1d' });

        res.status(201).json({ 
            message: "User registered successfully", 
            token,
            user: {
                name: user.name,
                gmail: user.gmail
                // add more user details if necessary
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User login
export const login = async (req, res) => {
    const { gmail, password } = req.body;

    try {
        let user = await User.findOne({ gmail });

        if (!user) return res.status(400).json({ message: "Wrong email or password." });

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1d' });

        res.json({ 
            message: `Welcome ${user.name}`, 
            token,
            user: {
                name: user.name,
                gmail: user.gmail
                // add more user details if necessary
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Define the routes
router.post('/register', register);
router.post('/login', login);

export default router;
