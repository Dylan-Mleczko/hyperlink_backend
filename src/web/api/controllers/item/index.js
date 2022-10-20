// import * as itemService from '../../../../services/item';
// import Joi from 'joi';

// const validateItem = (item) => {
//   // data validation
//   const itemDetailSchema = Joi.object().keys({
//     id: Joi.string().min(0).max(63),
//     name: Joi.string().min(0).max(63).required(),
//     description: Joi.string().min(0).max(400),
//     date: Joi.string().min(0).max(200),
//     link: Joi.string().min(0).max(400),
//   });
//   const itemDetailError = itemDetailSchema.validate(itemDetails).error;
//   if (itemDetailError) {
//     return res.status(422).json({
//       message: itemDetailError.details[0].message,
//       data: null,
//     });
//   }
// };

// export const getAllItems = async (req, res) => {
//   const items = await itemService.getAllItems();
//   res.json({ data: { items } });
// };

// export const getItem = async (req, res) => {
//   const item = await itemService.getItem(req.params.id);
//   res.json({ data: { item } });
// };

// export const addItem = async (req, res) => {
//   validateItem(req.body.itemDetails);
//   const item = await itemService.createItem(itemDetails);
//   res.json({ data: { item } });
// };

// export const updateItem = async (req, res) => {
//   validateItem(req.body.itemDetails);
//   const item = await itemService.updateItem(req.params.id, req.body.itemDetails);
//   res.json({ data: { item } });
// };

// export const deleteItem = async (req, res) => {
//   await itemService.deleteItem(req.params.id);
//   res.status(200).json({ res: 'deleted item successfully' });
// };
