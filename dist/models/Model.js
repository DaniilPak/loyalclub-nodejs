"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSchema = void 0;
const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
});
exports.dataSchema = dataSchema;
module.exports = mongoose.model('Data', dataSchema);
//# sourceMappingURL=Model.js.map