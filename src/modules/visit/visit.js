const { Schema, model, SchemaTypes } = require("mongoose")

const visitSchema = new Schema(
    {
        doctor_id: {
            type: SchemaTypes.ObjectId,
            ref: "doctor",
            required: [true, "Shifokor idsini kiritish shart !!!"]
        },
        patient_id: {
            type: SchemaTypes.ObjectId,
            ref: "patient",
            required: [true, "Bemor idsini kiritish shart !!!"]
        },
        diagnose_id: [{
            type: SchemaTypes.ObjectId,
            ref: "diagnose",
            required: [true, "Tashxis idsini kiritish shart !!!"]
        }],
        visit_record: {
            type: String,
            required: [true, "Muolaja haqida yozuv kiritilishi shart !!!"]
        },
        examination: {
            type: String,
            required: [true, "Bemorni shikoyatlari kiritilishi shart !!!"],
            trime: true
        }
    },
    {
        collection: "visit",
        timestamps: true,
        versionKey: false
    }
)

const Visit = model("visit", visitSchema)

module.exports = Visit