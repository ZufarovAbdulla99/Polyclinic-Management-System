const { Schema, model } = require("mongoose")

const diagnoseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Diagnoz nomi kiritilishi shart"]
        }
    },
    {
        collection: "diagnose",
        timestamps: true,
        versionKey: false
    }
)

const Diagnose = model("diagnose", diagnoseSchema)

module.exports = Diagnose