import mongoose from "mongoose";
import { TSpec } from "../utils/types";

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specs: Array<TSpec>,
  armortype: {
    type: String,
    required: true,
  },
});

const ClassModel = mongoose.model("Class", ClassSchema);
export default ClassModel;
