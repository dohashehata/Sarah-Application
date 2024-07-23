
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import User from './user.model.js';
import nodemailer from 'nodemailer';
import sendEmail from '../../middleware/sendEmail.js';
const JWT_SECRET = 'jwt_secret';

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists');

    user = new User({ username, email, password });
    await user.save();

    // Send email
    await sendEmail(email, 'Welcome to SearchApp', 'Your registration was successful');
    
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials: User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials: Incorrect password');

    const payload = { id: user._id };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) {
        console.error('JWT signing error:', err);
        return res.status(500).send('Server error');
      }
      res.json({ token });
    });
  } catch (error) {
    console.error('Sign-in error:', error.message);
    res.status(500).send('Server error');
  }
};

export { signUp, signIn };
