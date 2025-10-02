import { image } from "react-native";
class Ingredient {
  constructor(
    id,
    catingredientIds,
    title,
    price,
    packaging,
    imageUrl,
  ) {
    this.id = id;
    this.catingredientIds = catingredientIds;
    this.title = title;
    this.price = price;
    this.packaging = packaging;
    this.imageUrl = imageUrl;
  }
}

export default Ingredient;
