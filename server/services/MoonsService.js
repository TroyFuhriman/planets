import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class MoonsService {


  async find(query = {}) {
    let data = await dbContext.Moons.find(query).populate("planet").populate("star").populate("galaxy");
    return data;
  }
  async findById(id) {
    let data = await dbContext.Moons.findById(id).populate("planet").populate("star").populate("galaxy");
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(rawData) {
    return await dbContext.Moons.create(rawData)
  }
  async edit(update) {
    let data = await dbContext.Moons.findByIdAndUpdate(update.id, update, { new: true, runValidators: true })
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
  }
  async delete(id) {
    let data = await dbContext.Moons.findByIdAndDelete(id)
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
  }
}

export const moonsService = new MoonsService();