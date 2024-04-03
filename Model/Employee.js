const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 4 
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function(date) {
              
                const upcomingYear = new Date().getFullYear() + 1;
                return date.getFullYear() < upcomingYear;
            },
            message: 'Date of birth should not be in the upcoming year'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(phone) {
                return phone.length === 10; 
            },
            message: 'Phone number should be of 10 characters'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(email) {
                return /\S+@\S+\.\S+/.test(email); 
            },
            message: 'Email is not valid'
        }
    },
    department: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date,
        required: true,
        validate: {
            validator: function(dateOfJoining) {
                return dateOfJoining > this.dob; // Date of joining should be greater than date of birth
            },
            message: 'Date of joining should be greater than date of birth'
        }
    },
    reportingPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    experience: {
        type: Number,
        required: true,
        validate: {
            validator: function(experience) {
                return experience < ((new Date() - this.dob) / 1000 / 60 / 60 / 24 / 365.25); // Experience should be less than age in months
            },
            message: 'Experience should be less than age'
        }
    },
    salary: {
        type: Number,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
    governmentProof: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});


employeeSchema.pre('save', function(next) {
    // Mask phone number
    this.phoneNumber = '**********' + this.phoneNumber.slice(-4);

    // Mask email
    const parts = this.email.split('@');
    this.email = parts[0].slice(0, 1) + '******' + parts[0].slice(-1) + '@' + parts[1];

    next();
});

module.exports = mongoose.model('Employee', employeeSchema);
