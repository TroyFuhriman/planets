import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class GalaxiesService {


  async find(query = {}) {
    let galaxies = await dbContext.Galaxies.find(query);
    return galaxies;
  }
  async findById(id) {
    let data = await dbContext.Galaxies.findById(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(rawData) {
    return await dbContext.Galaxies.create(rawData)
  }
  async edit(update) {
    let data = await dbContext.Galaxies.findByIdAndUpdate(update.id, update, { new: true, runValidators: true })
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
  }
  async delete(id) {
    let data = await dbContext.Galaxies.findByIdAndDelete(id)
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
  }
}

export const galaxiesService = new GalaxiesService();