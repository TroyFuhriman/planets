import express from "express";
import BaseController from "../utils/BaseController";
import { planetsService } from "../services/PlanetsService"
import { moonsService } from "../services/MoonsService"

export class PlanetsController extends BaseController {
  constructor() {
    super("api/planets");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/moons", this.getMoonsByPlanetId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)

  }
  async getAll(req, res, next) {
    try {
      let data = await planetsService.find(req.query)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await planetsService.findById(req.params.id);
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async getMoonsByPlanetId(req, res, next) {
    try {
      let data = await moonsService.find({ galaxy: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      let data = await planetsService.create(req.body)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      let data = await planetsService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await planetsService.delete(req.params.id)
      return res.send("Deleted")
    } catch (error) {
      next(error)
    }
  }
}