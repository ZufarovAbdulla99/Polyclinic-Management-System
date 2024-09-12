const {Schema, model, SchemaTypes} = require("mongoose")

const patientSchema = new Schema(
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
        area_id: {
            type: SchemaTypes.ObjectId,
            ref: "area"
        },
        image_url: {
            type: String,
            required: false,
            default: "image-1726131967802-856245584.jpg"
        }
    },
    {
        collection: "patient",
        timestamps: true,
        versionKey: false
    }
)

const Patient = model("patient", patientSchema)

module.exports = Patient