import mongoose from "mongoose";

export type TClass = {
  id?: mongoose.Schema.Types.ObjectId;
  name: string;
  specs: TSpec[];
};

export type TSpec = {
  name: string;
  mainstat: string;
};
