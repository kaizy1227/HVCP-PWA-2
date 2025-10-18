import { image } from "react-native";
class Equipment {
  constructor(id, machineIds, title, imageUrl, price, packaging) {
    this.id = id;
    this.machineIds = machineIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.packaging = packaging;
  }
}

export default Equipment;
