import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import orphanagesView from '../views/orphanages_view';
import Orphanage from "../models/Orphanage";
import User from "../models/User";
import Image from "../models/Image";
import { array } from "yup";

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });
    
    var user = {id:0,name:'',password:'',email:''};

    return response.json(orphanagesView.renderMany(orphanages, user));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });
  
    return response.json(orphanagesView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      whatsapp,
      open_on_weekends,
      images,
    } = request.body;
    
    const orphanagesRepository = getRepository(Orphanage);
    const arrayImages = Array();
    for (let index = 0; index < images.length; index++) {
      var img = new Image();
      img.path = images[index];
      arrayImages.push(img)
    }
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      whatsapp,
      opening_hours,
      open_on_weekends,
      images:arrayImages,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      whatsapp: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required(),
      })).required().min(1),
    });
    

    console.log(data);

    // await schema.validate(data, {
    //   abortEarly: false,
    // });

    const orphanage = orphanagesRepository.create(data);
    
    await orphanagesRepository.save(orphanage)
  
    return response.status(201).json(orphanage);
  }
}