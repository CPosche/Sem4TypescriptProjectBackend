import DungeonModel from "../../models/DungeonModel";

export default {
  hello: () => "Hello world!",
  dungeons: async (_parent: never, _args: never) => DungeonModel.find(),
};
