import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

const Planet = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    galaxy: { type: ObjectId, ref: "Galaxy", required: true },
    star: { type: ObjectId, ref: "Star", required: true }

  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Planet;
