class NitroSoda {
  constructor(
    id,
    catnitrosodaIds,
    title,
    duration,
    price,
    imageUrl,        // 🎥 Video chính
    mediaUrls = []   // 🖼 Bộ ảnh minh họa
  ) {
    this.id = id;
    this.catnitrosodaIds = catnitrosodaIds;
    this.title = title;
    this.duration = duration;
    this.price = price;
    this.imageUrl = imageUrl;
    this.mediaUrls = mediaUrls;
  }
}

export default NitroSoda;
