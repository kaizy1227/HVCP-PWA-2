import { image } from "react-native";
class Drink {
  constructor(
    id,
    catdrinkIds,
    title,
    imageUrl,
    recipe,
    ingredientRefs = []
  ) {
    this.id = id;
    this.catdrinkIds = catdrinkIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.recipe=recipe;
    this.ingredientRefs = ingredientRefs; // 🆕 danh sách ID nguyên liệu
  }
}

export default Drink;
