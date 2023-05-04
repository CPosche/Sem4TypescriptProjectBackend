import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Dungeon {
    name: String!
    image: String
    items: [Item]
  }

  type Class {
    id: ID!
    name: String!
    specs: [Spec]
    armortype: String!
  }

  type Spec {
    name: String!
    mainstat: String!
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
    id: Int
    name: String
  }
  type User {
    username: String
    id: ID
    favoriteClass: Class
  }
  
  type returnedUser {
    user: User
    status: Int
  }
  
  type Query {
    dungeons: [Dungeon]
    items: [Item]
    classes: [Class]
    users: [User]
  }
  
  type Mutation {
    login(username: String!, password: String!): String
    register(username: String!, password: String!): returnedUser
    addFavoriteClass(username: String! classId: ID!): returnedUser
  }
`;

export default typeDefs;
