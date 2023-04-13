import mongoose from "mongoose";

export type TClass = {
  id?: mongoose.Types.ObjectId;
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

export type TStatDisplay = {
  display_string: string;
  color: { r: Number; g: Number; b: Number; a: Number };
};

export type TItem = {
  id?: mongoose.Types.ObjectId;
  name: string;
  preview_item: TPreviewItem;
};

export type TDungeon = {
  id?: mongoose.Types.ObjectId;
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
