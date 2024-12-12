// ./models/Products.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
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
    employee_id: {
        type: String,
        required: [true, 'Employee ID is required'],
        unique: true
    },
    department: {
        type: String,
        required: [true, 'Employement Position is required'],
        enum: ['cashier', 'stocker', 'manager', 'clerk', 'security', 'admin']
    },
    employment_type: {
        type: String,
        required: [true, 'Schedule is required'],
        enum: ['part-time', 'full-time']
    },
    date_hired: {
        type: Date,
        required: [true, 'Date hired is required']
    },
    isAdmin: {
    type: Boolean,
    required: [true, 'Adminstrator is required']
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
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = employeeSchema;