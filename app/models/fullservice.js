class FullService {
  constructor(
    id,
    catfullserviceIds,
    title,
    imageUrl,
    fullImageUrl = [], // 👉 Mảng ảnh chi tiết (nếu có)
    description = ""   // 👉 Mô tả dịch vụ (nếu có)
  ) {
    this.id = id;
    this.catfullserviceIds = catfullserviceIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.fullImageUrl = fullImageUrl;
    this.description = description;
  }
}

export default FullService;
