import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    fullName: {type:String, required: true},
    phoneNumber: {type: Number, required: true},
    landmark: {type:String, required: false},
    street: {type: String, required: true},
    barangay: {type: String, required: true},
    city: {type: String, required: true},
    province: {type: String, required: true},
})

const Address = mongoose.models.address || mongoose.model('address', addressSchema)
export default Address