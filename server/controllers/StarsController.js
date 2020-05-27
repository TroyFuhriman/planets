import express from "express";
import BaseController from "../utils/BaseController";
import { starsService } from "../services/StarsService";
import { planetsService } from "../services/PlanetsService"
import { moonsService } from "../services/MoonsService"

export class StarsController extends BaseController {
  constructor() {
    super("api/stars");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/planets", this.getPlanetsByStarId)
      .get("/:id/planets/moons", this.getMoonsByStarId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)

  }
  async getAll(req, res, next) {
    try {
      let data = await starsService.find(req.query)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await starsService.findById(req.params.id);
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async getPlanetsByStarId(req, res, next) {
    try {
      let data = await planetsService.find({ galaxy: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getMoonsByStarId(req, res, next) {
    try {
      let data = await moonsService.find({ galaxy: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      let data = await starsService.create(req.body)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      let data = await starsService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await starsService.delete(req.params.id)
      return res.send("Deleted")
    } catch (error) {
      next(error)
    }
  }
}