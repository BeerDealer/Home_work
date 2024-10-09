const { Advertisement } = require("./advertisement.model");

class AdvertisementService {
  static async find(
    params = { shortText: "", description: "", userId: 0, tags: [] }
  ) {
    const shortTextRegex = new RegExp(params.shortText);
    const descriptionRegex = new RegExp(params.description);
    try {
      const advertisement = await Advertisement.find({
        shortText: shortTextRegex,
        description: descriptionRegex,
        userId: params.userId,
        tags: { $all: params.tags },
      });
      return advertisement;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async findalAll() {
    try {
      const advertisements = await Advertisement.find();
      return advertisements;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async create(data) {
    try {
      const advertisement = new Advertisement(data);
      await advertisement.save();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async remove(id) {
    try {
      await Advertisement.findOneAndUpdate({ _id: id }, { isDeleted: true });
      return { message: "Ok" };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = AdvertisementService;
