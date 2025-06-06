const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // Automatically remove the document after 24hrs 
    }
}); 

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);