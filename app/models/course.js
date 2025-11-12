class Course {
  constructor(id, catcourseIds, title, duration, price, imageUrl, mediaUrls = []) {
    this.id = id;
    this.catcourseIds = catcourseIds;
    this.title = title;
    this.duration = duration;
    this.price = price;
    this.imageUrl = imageUrl;
    this.mediaUrls = mediaUrls; // ✅ chứa cả ảnh hoặc video
  }
}

export default Course;
