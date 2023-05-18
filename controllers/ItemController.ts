import dungeonModel from "../models/DungeonModel";
import mongoose from "mongoose";
import {stat, TItem} from "../utils/types";
import itemModel from "../models/ItemModel";
import ItemModel from "../models/ItemModel";

const getItems = async (dungeonId: String) => {
    const dungeon = await dungeonModel.findById(dungeonId);
    var items: Array<TItem> = [];
    if(dungeon){
        const dungeonItems = dungeon.items;
        for (const item of dungeonItems) {
            items.push((await ItemModel.findById(item))!);
        }
        //console.log(items);

        return items
    }
    else{
        return items
    }
}

const getItemsFromSpecificDungeon = async (dungeonId: mongoose.Types.ObjectId) => {
    const dungeon = await dungeonModel.findById(dungeonId);
    if(dungeon){
        const dungeonItems = dungeon.items;

        var items: Array<TItem> = [];
        for (const item of dungeonItems) {
            items.push((await ItemModel.findById(item))!);
        }
        //console.log(items);

        return {items, status: 200}
    }
    else{
        return {message: "Dungeon not found", status: 404}

    }


}

const ItemController = {
    getItemsFromSpecificDungeon,
    getItems,

}

export default ItemController;