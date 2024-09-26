const { Schema, model, SchemaTypes } = require("mongoose")

const registration_nurseSchema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, "Ism kiritilishi shart !!!"],
            minLength: [3, "Ism uzunligi 3 belgidan kam bo'lmasligi kerak"]
        },
        last_name: {
            type: String,
            required: [true, "Familiya kiritilishi shart !!!"],
            minLength: [3, "Familiya uzunligi 3 belgidan kam bo'lmasligi kerak !!!"]
        },
        birth_date: {
            type: Date,
            required: [true, "Tug'ilgan sana kiritilishi shart !!!"]
        },
        address: {
            type: String,
            required: [true, "Manzil kiritilishi shart !!!"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Telefon raqam kiritilishi shart !!!"]
        },
        passport: {
            type: String,
            required: [true, "Passport seriya va raqami kiritilishi shart !!!"]
        },
        date_of_recruitment: {
            type: String
        },
        schedule_id: [{
            type: SchemaTypes.ObjectId,
            ref: "schedule"
        }],
        speciality_id: {
            type: SchemaTypes.ObjectId,
            ref: "speciality"
        },
        role: {
            type: String,
            enum: {
                values: ["nurse", "registration_nurse", "doctor", "admin"],
            },
            required: true,
            default: "registration_nurse",
        },
    },
    {
        collection: "registration_nurse",
        timestamps: true,
        versionKey: false
    }
)

const Registration_nurse = model("registration_nurse", registration_nurseSchema)

module.exports = Registration_nurse