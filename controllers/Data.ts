import { Request, Response } from "express";
import { TClass, TItem } from "../utils/types";
import axios from "axios";
import ClassModel from "../models/ClassModel";

const getItem = async (req: Request, res: Response) => {
  const apiurl =
    "https://us.api.blizzard.com/data/wow/item/193645?namespace=static-us&locale=en_US&access_token=EUHN1Ua8W8imYHe92ERv48o4GSO9PZtmGH";
  const data = await axios.get<TItem>(apiurl);
  const item = data.data;
  res.status(200).json({
    status: "success",
    data: item,
  });
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
};

export default data;
