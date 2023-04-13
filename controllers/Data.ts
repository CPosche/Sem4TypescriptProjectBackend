import { Request, Response } from "express";
import {
  TClass,
  TDungeon,
  TItem,
  TItemLevel,
  TPreviewItem,
  TInventoryType,
  TItemSubclass,
  TStat,
  TStatType,
  TStatDisplay,
} from "../utils/types";
import axios from "axios";
import ClassModel from "../models/ClassModel";
import ItemModel from "../models/ItemModel";
import DungeonModel from "../models/DungeonModel";
import mongoose from "mongoose";
import OAuth from "../utils/OAuth";

const getItem = async (itemids: Number[]) => {
  const access_token = await OAuth.getAccessToken();
  let items: mongoose.Types.ObjectId[] = [];
  for (let itemid of itemids) {
    const apiurl = `https://us.api.blizzard.com/data/wow/item/${itemid}?namespace=static-us&locale=en_US&access_token=${access_token}`;
    const data = await axios.get<TItem>(apiurl);
    const inventory_type: TInventoryType = {
      type: data.data.preview_item.inventory_type.type,
      name: data.data.preview_item.inventory_type.name,
    };
    const item_level: TItemLevel = {
      value: data.data.preview_item.level.value,
      display_string: data.data.preview_item.level.display_string,
    };
    const item_subclass: TItemSubclass = {
      key: { href: data.data.preview_item.item_subclass.key.href },
      id: data.data.preview_item.item_subclass.id,
      name: data.data.preview_item.item_subclass.name,
    };
    const stats: TStat[] = data.data.preview_item.stats.map((stat) => {
      const type: TStatType = {
        type: stat.type.type,
        name: stat.type.name,
      };
      const display: TStatDisplay = {
        display_string: stat.display.display_string,
        color: stat.display.color,
      };
      const statobj: TStat = {
        type: type,
        value: stat.value,
        display: display,
      };
      return statobj;
    });
    const preview_item: TPreviewItem = {
      inventory_type: inventory_type,
      level: item_level,
      item_subclass: item_subclass,
      stats: stats,
    };
    const item: TItem = {
      name: data.data.name,
      preview_item: preview_item,
    };
    ItemModel.create(item).then((item) => {
      items.push(item._id);
    });
  }
  return items;
};

const getDungeons = async (req: Request, res: Response) => {
  const access_token = await OAuth.getAccessToken();
  const ids = await getMythicIds();
  let dungeons: TDungeon[] = [];
  let itemids: Number[] = [];
  for (let id of ids) {
    const apiurl = `https://us.api.blizzard.com/data/wow/journal-instance/${id}?namespace=static-us&locale=en_US&access_token=${access_token}`;
    const data = await axios.get(apiurl).then((res) => res.data);
    const image = data.name
      .replaceAll(" ", "-")
      .toLowerCase()
      .replaceAll("'", "");
    for (let encounter of data.encounters) {
      const encounterapi = `https://us.api.blizzard.com/data/wow/journal-encounter/${encounter.id}?namespace=static-us&locale=en_US&access_token=${access_token}`;
      const encounterdata = await axios
        .get(encounterapi)
        .then((res) => res.data);
      for (let item of encounterdata.items) {
        itemids.push(item.id);
      }
    }
    const items = await getItem(itemids);
    const dungeon: TDungeon = {
      name: data.name,
      image: `https://render.worldofwarcraft.com/us/zones/${image}-small.jpg`,
      items: items,
    };
    dungeons.push(dungeon);
  }
  DungeonModel.create(dungeons).then((dungeons) => {
    res.status(200).json({
      status: "success",
      data: dungeons,
    });
  });
};

const getMythicIds = async () => {
  const access_token = await OAuth.getAccessToken();
  const apiurl = `https://us.api.blizzard.com/data/wow/journal-expansion/505?namespace=static-us&locale=en_US&access_token=${access_token}`;
  const data = await axios.get(apiurl).then((res) => res.data);
  const ids: Number[] = data.dungeons.map(
    (dungeon: { id: number }) => dungeon.id
  );
  return ids;
};

const getClasses = async (req: Request, res: Response) => {
  const classes: TClass[] = await ClassModel.find();
  res.status(200).json({
    status: "success",
    data: classes,
  });
};

const data = {
  getItem,
  getClasses,
  getDungeons,
};

export default data;
