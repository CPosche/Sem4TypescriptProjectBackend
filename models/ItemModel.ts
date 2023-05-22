import mongoose from "mongoose";
import { TPreviewItem } from "../utils/types";

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    preview_item: {
        type: Object as () => TPreviewItem,
        required: true,
    },
});

const ItemModel = mongoose.model("Item", ItemSchema);
export default ItemModel;