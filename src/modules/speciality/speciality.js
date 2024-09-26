const { Schema, model } = require("mongoose")

const specialitySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Yo'nalish nomi kiritilishi shart !!!"]
        }
    },
    {
        collection: "speciality",
        timestamps: true,
        versionKey: false
    }
)

const Speciality = model("speciality", specialitySchema)

module.exports = Speciality