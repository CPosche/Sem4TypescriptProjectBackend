import { Request, Response } from "express";
import { TClass, TItem } from "../utils/types";
import axios from "axios";
import ClassModel from "../models/ClassModel";
import ItemModel from "../models/ItemModel";

const getItem = async (req: Request, res: Response) => {
  const apiurl =
    "https://us.api.blizzard.com/data/wow/item/19019?namespace=static-us&locale=en_US&access_token=EUUVzF1OlhYKon1b0uH3RhhW1APVDsDepB";
  const data = await axios.get<TItem>(apiurl);
  const item = data.data;
  ItemModel.create(item).then((item) => {
    res.status(200).json({
      status: "success",
      data: item,
      });
  });
};

const getDungeons = async (req: Request, res: Response) => {
  const ids = await getMythicIds();
  let dungeons: any[] = [];
  let items : any[] = [];
  for (let id of ids) {
    const apiurl = `https://us.api.blizzard.com/data/wow/journal-instance/${id}?namespace=static-us&locale=en_US&access_token=EUUVzF1OlhYKon1b0uH3RhhW1APVDsDepB`;
    const data = await axios.get(apiurl).then((res) => res.data);
    dungeons.push(data);
  }
  for (let dungeon of dungeons) {
    for (let item of dungeon.items) {
    }
  }
  res.status(200).json({
    status: "success",
    data: dungeons,
  });
};

const getMythicIds = async () => {
  const apiurl = "https://us.api.blizzard.com/data/wow/journal-expansion/505?namespace=static-us&locale=en_US&access_token=EUUVzF1OlhYKon1b0uH3RhhW1APVDsDepB";
  const data = await axios.get(apiurl).then((res) => res.data);
  const ids: Number[] = data.dungeons.map((dungeon: {id: number}) => dungeon.id)
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
