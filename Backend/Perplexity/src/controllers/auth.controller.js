import { UserModel } from "../models/user.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/mail.service.js";

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        const isUser = await UserModel.findOne({ email });
        if (isUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await UserModel.create({
            username,
            email,
            password
        });

        await sendMail(
            email,
            "Welcome to Perplexity",
            `<p>Thank you for registering</p>`,
            "Thank you for registering"
        );

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}