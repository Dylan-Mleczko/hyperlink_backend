/* eslint-disable camelcase */
// import Joi from 'joi';
import { Item } from '../../models';

export const getAllItems = async () => await Item.find();

export const getItem = async (id) => await Item.findById(id);

export const deleteItem = async (id) => await Item.findByIdAndDelete(id);

export const createItem = async (item) => await Item.create(item);

export const updateItem = async (item) => await Item.findByIdAndUpdate(item);
