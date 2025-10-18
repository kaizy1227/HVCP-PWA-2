import { image } from "react-native";
class Machine {
  constructor(id, catmachineIds, title, imageUrl, price, packaging) {
    this.id = id;
    this.catmachineIds = catmachineIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.packaging = packaging;
  }
}

export default Machine;
