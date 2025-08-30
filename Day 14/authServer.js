const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [];

const jwtSecretKey = "my_super_secret_jwt_key_that_no_one_will_ever_guess";

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Please provide both username and password." });
        }

        const userExists = users.find(u => u.username === username);
        if (userExists) {
            return res.status(409).json({ message: "Username already exists. Please choose another one." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword
        };

        users.push(newUser);

        console.log(`New user registered: ${username}`);
        res.status(201).json({ message: "User registered successfully!" });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const payload = {
            id: user.id,
            username: user.username
        };

        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });

        console.log(`User logged in: ${username}`);
        res.status(200).json({ message: "Login successful!", token });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: No token provided.' });
    }
}

app.get('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, jwtSecretKey, (err, authData) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token.' });
        }

        res.status(200).json({
            message: "Profile data fetched successfully!",
            userData: authData
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server started. Listening on http://localhost:${PORT}`);
});
