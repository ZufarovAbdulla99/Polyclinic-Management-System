const { Schema, model, SchemaTypes } = require("mongoose")

const nurseSchema = new Schema(
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
        area_id: {
            type: SchemaTypes.ObjectId,
            ref: "area"
        },
        role: {
            type: String,
            enum: {
                values: ["nurse", "registration_nurse", "doctor", "admin"],
            },
            required: true,
            default: "nurse",
        },
    },
    {
        collection: "nurse",
        timestamps: true,
        versionKey: false
    }
)

const Nurse = model("nurse", nurseSchema)

module.exports = Nurse