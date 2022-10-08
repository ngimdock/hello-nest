const Joi = require('joi');

import { IsString, IsNumber } from 'class-validator';

export class CreateCatDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;
}

export class UpdateCatDto {
  id: number;
  name: string;
  age: number;
  breed: string;
}

export const createCatSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});
