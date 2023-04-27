import DungeonModel from "../../models/DungeonModel";
import ItemModel from "../../models/ItemModel";

export default {
  dungeons: async (_parent: never, _args: never) => DungeonModel.find(),
  items: async (_parent: never, _args: never) => ItemModel.find(),
};
