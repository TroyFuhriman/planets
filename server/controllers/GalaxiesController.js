import express from "express";
import BaseController from "../utils/BaseController";
import { galaxiesService } from "../services/GalaxiesService"
import { starsService } from "../services/StarsService"
import { planetsService } from "../services/PlanetsService"
import { moonsService } from "../services/MoonsService"

export class GalaxiesController extends BaseController {

  constructor() {
    super("api/galaxies");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/stars", this.getStarsByGalaxyId)
      .get("/:id/stars/planets", this.getPlanetsByGalaxyId)
      .get("/:id/stars/planets/moons", this.getmoonsByGalaxyId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)

  }
  async getAll(req, res, next) {
    try {
      let data = await galaxiesService.find(req.query)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await galaxiesService.findById(req.params.id);
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async getStarsByGalaxyId(req, res, next) {
    try {
      let data = await starsService.find({ galaxy: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getPlanetsByGalaxyId(req, res, next) {
    try {
      let data = await planetsService.find({ galaxy: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getmoonsByGalaxyId(req, res, next) {
    try {
      let data = await moonsService.find({ galaxy: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      let data = await galaxiesService.create(req.body)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      let data = await galaxiesService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await galaxiesService.delete(req.params.id)
      return res.send("Deleted")
    } catch (error) {
      next(error)
    }
  }
}