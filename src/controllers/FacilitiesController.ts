import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/facilities_view';
import * as Yup from 'yup';
import Facility from '../models/Facility';

export default {
  async index(request: Request, reponse: Response) {
    const facilitiesRepository = getRepository(Facility);
    const facilities = await facilitiesRepository.find({
      relations: ['images']
    });
    return reponse.json(orphanageView.renderMany(facilities));
  },
  async show(request: Request, reponse: Response) {
    const { id } = request.params;
    const facilitiesRepository = getRepository(Facility);
    const facility = await facilitiesRepository.findOneOrFail(id, {
      relations: ['images']
    });
    return reponse.json(orphanageView.render(facility));
  },
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

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    })
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_hours,
      open_on_weekends,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      open_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required(),
      })),
    });

    await schema.validate(data, { abortEarly: false })

    const facility = facilitiesRepository.create(data);

    await facilitiesRepository.save(facility);

    return reponse.status(201).json(facility);
  }
}
