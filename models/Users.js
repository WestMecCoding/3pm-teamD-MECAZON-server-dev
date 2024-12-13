// ./models/Products.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        first_name: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        last_name: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true
        },
    },
    contact_info: {
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true
        },
        phone_number: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true
    }

    // Add other fields as necessary, no clue what to add now. Add Payment (String), Orders (Arr), Location (Rechange)
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = userSchema;