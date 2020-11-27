import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';
const crypto = require('crypto');
// ...


import User from "../models/User";
import Orphanage from "../models/Orphanage";
import orphanagesView from '../views/orphanages_view';

export default {
    async login(request: Request, response: Response){
        
        return response.render('login');
    },
    
    async create(request: Request, response: Response) {
        const {
        name,
        email,
        password,
        } = request.body;
        
        const usersRepository = getRepository(User);
        const id = crypto.randomBytes(4).toString('HEX');
        const data = {
        id,
        name,
        email,
        password,
        };

        const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        });

        await schema.validate(data, {
        abortEarly: false,
        });

        const user = usersRepository.create(data);
        
        await usersRepository.save(user);
    
        return response.json({id});
    },

    async show(request: Request, response: Response) {
        const { email, password } = request.body;        
        const usersRepository = getRepository(User);
    
        const user = await usersRepository.findOneOrFail({ where: { email: `${email}`, password: `${password}` } })
      
        return response.json(orphanagesView.renderUser(user));
      },
}