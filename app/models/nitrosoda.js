class NitroSoda {
  constructor(
    id,
    catnitrosodaIds,
    title,
    duration,
    price,
    videoUrl // 🎥 chỉ dùng video
  ) {
    this.id = id;
    this.catnitrosodaIds = catnitrosodaIds;
    this.title = title;
    this.duration = duration;
    this.price = price;
    this.videoUrl = videoUrl; // ✅ đường dẫn hoặc require() video
  }
}

export default NitroSoda;
