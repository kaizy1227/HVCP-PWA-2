class Course {
  constructor(id, catcourseIds, title, duration, price, imageUrl, imageUrls = []) {
    this.id = id;
    this.catcourseIds=catcourseIds;
    this.title = title;
    this.duration = duration;
    this.price = price;
    this.imageUrl = imageUrl;
    this.imageUrls = imageUrls;
  }
}

export default Course;
