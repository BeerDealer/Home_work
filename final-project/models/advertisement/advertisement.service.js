const { Advertisement } = require("./advertisement.model");

class AdvertisementService {
  async find(params = { shortText: "", description: "", userId: 0, tags: [] }) {
    const shortTextRegex = new RegExp(params.shortText);
    const descriptionRegex = new RegExp(params.description);
    try {
      const advertisement = await Advertisement.find({
        $and: [
          { shortText: shortTextRegex },
          { description: descriptionRegex },
          { userId: params.userId },
          { tags: { $all: params.tags } },
        ],
      });
      return advertisement;
    } catch (e) {
      return { err: e, message: e.Message };
    }
  }

  async create(data) {
    try {
      new Advertisement(data);
    } catch (e) {
      return { err: e, message: e.Message };
    }
  }
  async remove(id) {
    try {
      await Advertisement.findOneAndUpdate({ _id: id }, { isDeleted: true });
      return { message: "Ok" };
    } catch (e) {
      return { err: e, message: e.Message };
    }
  }
}

module.exports = AdvertisementService;
