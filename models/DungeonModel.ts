import mongoose from "mongoose";
import ItemModel from "./ItemModel";

const DungeonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  items: {
    type: Array<mongoose.Types.ObjectId>,
    ref: "Item",
  },
});

// populate items with item ids
DungeonSchema.pre("find", function (next) {
  this.populate("items");
  next();
});

const DungeonModel = mongoose.model("Dungeon", DungeonSchema);
export default DungeonModel;
