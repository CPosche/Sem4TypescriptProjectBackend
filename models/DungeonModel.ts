import mongoose from "mongoose";

const DungeonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  items: Array<mongoose.Types.ObjectId>,
});

const DungeonModel = mongoose.model("Dungeon", DungeonSchema);
export default DungeonModel;
