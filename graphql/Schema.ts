import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Dungeon {
    name: String!
    image: String
    items: [Item]
  }

  type Item {
    name: String!
    preview_item: PreviewItem
  }

  type PreviewItem {
    inventory_type: InventoryType
    item_subclass: ItemSubclass
    stats: [Stat]
    level: ItemLevel
  }

  type ItemLevel {
    value: Int
    display_string: String
  }

  type Stat {
    type: StatType
    value: Int
    display: StatDisplay
  }

  type StatType {
    type: String
    name: String
  }

  type StatDisplay {
    display_string: String
    color: Color
  }

  type Color {
    r: Int
    g: Int
    b: Int
    a: Int
  }

  type InventoryType {
    type: String
    name: String
  }

  type ItemSubclass {
    type: String
    name: String
  }

  type Query {
    hello: String
    dungeons: [Dungeon]
  }
`;

export default typeDefs;
