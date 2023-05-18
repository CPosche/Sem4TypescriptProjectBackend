import ItemController from "./ItemController";
import {calcData, TItem, TStat, TStatWeight} from "../utils/types";
import dungeonModel from "../models/DungeonModel";
import Data from "./Data";

const dummyData = {
    classData: {
        mainStat: "Agility",
        armorType: "Mail"
    },
    dungeons: new Map<string, TItem[]>([
        ["64522f453088166f0d830fe7", Array<TItem>()],
        ["64522f453088166f0d830fe8", Array<TItem>()],
    ]),
    statPriority: [
        "HASTE_RATING",
        "MASTERY_RATING",
        "VERSATILITY",
        "CRIT_RATING"
    ],
};

const sortItemsByPriority = (items: TItem[]): TItem[] => {
    return items.sort((a, b) => {
        for (const stat of dummyData.statPriority) {
            const aValue = a.preview_item.stats.find((s: TStat) => s.type.type === stat)?.value || 0;
            const bValue = b.preview_item.stats.find((s: TStat) => s.type.type === stat)?.value || 0;

            if (aValue !== bValue) {
                return Number(bValue) - Number(aValue); // Return items with higher value first
            }
        }
        return 0; // Return as is if all priorities are the same
    });
};

const getItemsFromStatWeight = async (calcData:calcData) => {

    let dungeonNames: [string] = [""];
    let dungeonMap = new Map<String, TItem[]>();
    const awaitData = calcData.calcData.dungeons.map(async (dungeon)  => {

        await dungeonMap.set(dungeon, await ItemController.getItems(dungeon));
        if(dungeonNames[0] === ""){
            dungeonNames.pop();
        }
        dungeonNames.push(await Data.getDungeonNames(dungeon));
    });
    await Promise.all(awaitData);

    for (const [key, value] of dungeonMap) {
        const filteredItems = value.filter((item) => {
            return item.preview_item.item_subclass.name === calcData.calcData.classData.armorType;
        });
        dungeonMap.set(key, sortItemsByPriority(filteredItems));
    }


    return {Items: dungeonMap.values(), dungeons: dungeonNames, status: 200};
}

const MathController = {
    getItemsFromStatWeight
}

export default MathController;