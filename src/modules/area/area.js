const { Schema, model } = require("mongoose")

const areaSchema = new Schema(
    {
        name: {
            type: String,
            requried: true,
        },
        description: {
            type: String,
            requried: true
        },
        population: {
            type: Number,
            required: true
        }
    },
    {
        collection: "area",
        timestamps: true,
        versionKey: false
    }
)

const Area = model("area", areaSchema)

module.exports = Area