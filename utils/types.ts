import mongoose from "mongoose";
import {Request, Response} from "express";
import {JwtPayload} from "jsonwebtoken";

export type TClass = {
  _id?: mongoose.Types.ObjectId;
  name: string;
  specs: TSpec[];
  armortype: string;
};

export type TSpec = {
  name: string;
  mainstat: string;
};

export type TPreviewItem = {
  inventory_type: TInventoryType;
  item_subclass: TItemSubclass;
  stats: TStat[];
  level: TItemLevel;
};

export type TItemLevel = {
  value: Number;
  display_string: string;
};

export type TStat = {
  type: TStatType;
  value: Number;
  display: TStatDisplay;
};

export type TStatType = {
  type: string;
  name: string;
};

export type TStatWeight = {
    type: string;
    value: number;
}

export type TStatDisplay = {
  display_string: string;
  color: { r: Number; g: Number; b: Number; a: Number };
};

export type TItem = {
  _id?: mongoose.Types.ObjectId;
  name: string;
  media?: { id: Number };
  image: string;
  preview_item: TPreviewItem;
};

export type TDungeon = {
  _id?: mongoose.Types.ObjectId;
  name: string;
  image: string;
  items: mongoose.Types.ObjectId[];
};

export type TInventoryType = {
  type: string;
  name: string;
};

export type TItemSubclass = {
  key: { href: string };
  name: string;
  id: Number;
};

export type TUser = {
  username: string;
};

export type stat={
    type: string;
    value: number;
}


interface AuthHeaders extends Headers {
  authorization?: string;
}

export type Args = {
  username: string;
  password?: string;
  classId?: string;

}

export type dungeonID = {
  ID: mongoose.Types.ObjectId;
}

export type dungeonNames = {
    name: string;
}

type classDataOutput = {
  mainStat: String,
  armorType: String,
}



export type calcData = {
  calcData:{
    classData: classDataOutput,
    dungeons: [string],
    statPriority: [string]
  }

}