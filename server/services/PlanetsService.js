import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class PlanetsService {


  async find(query = {}) {
    let planets = await dbContext.Planets.find(query).populate("star").populate("galaxy")
    return planets;
  }
  async findById(id) {
    let data = await dbContext.Planets.findById(id).populate("star").populate("galaxy")
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(rawData) {
    return await dbContext.Planets.create(rawData)
  }
  async edit(update) {
    let data = await dbContext.Planets.findByIdAndUpdate(update.id, update, { new: true, runValidators: true })
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
  }
  async delete(id) {
    let data = await dbContext.Planets.findByIdAndDelete(id)
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
  }
}

export const planetsService = new PlanetsService();