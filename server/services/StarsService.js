import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class StarsService {


  async find(query = {}) {
    let stars = await dbContext.Stars.find(query).populate("galaxy");
    return stars;
  }
  async findById(id) {
    let data = await dbContext.Stars.findById(id).populate("galaxy");
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(rawData) {
    return await dbContext.Stars.create(rawData)
  }
  async edit(update) {
    let data = await dbContext.Stars.findByIdAndUpdate(update.id, update, { new: true, runValidators: true })
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
  }
  async delete(id) {
    let data = await dbContext.Stars.findByIdAndDelete(id)
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
  }
}

export const starsService = new StarsService();