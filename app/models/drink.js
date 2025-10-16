class Drink {
  constructor(
    id,
    catdrinkIds,
    title,
    thumbnailUrl,   // ảnh nhẹ hiển thị trong list
    fullImageUrl,   // ảnh HD hiển thị trong modal
    recipe = "",
    ingredientRefs = []
  ) {
    this.id = id;
    this.catdrinkIds = catdrinkIds;
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.fullImageUrl = fullImageUrl;
    this.recipe = recipe;
    this.ingredientRefs = ingredientRefs;
  }
}

export default Drink;
