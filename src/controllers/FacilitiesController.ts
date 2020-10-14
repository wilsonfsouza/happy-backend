import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Facility from '../models/Facility';

export default {
  async create(request: Request, reponse: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_hours,
      open_on_weekends
    } = request.body;

    const facilitiesRepository = getRepository(Facility);

    const facility = facilitiesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_hours,
      open_on_weekends
    });

    await facilitiesRepository.save(facility);

    return reponse.status(201).json(facility);
  }
}
