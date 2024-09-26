const { Schema, model } = require("mongoose")

const scheduleSchema = new Schema(
    {
        appointment_day: {
            type: String,
            required: true
        },
        appointment_hour: {
            type: String,
            required: true
        },
        room_number: {
            type: Number,
            required: true
        }
    },
    {
        collection: "schedule",
        timestamps: true,
        versionKey: false
    }
)

const Schedule = model("schedule", scheduleSchema)

module.exports = Schedule