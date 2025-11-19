class DesignSetup {
  constructor(id, title, imageUrl, mediaUrls = []) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;   // Ảnh đại diện
    this.mediaUrls = mediaUrls; // Danh sách ảnh/video hiển thị trong Modal
  }
}

export default DesignSetup;
