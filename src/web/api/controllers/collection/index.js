import * as collectionService from '../../../../services/collection';
import Joi from 'joi';

export const registerCollection = async (req, res) => {
  const data = req.body;
  const collectionDetails = data.collectionDetails;

  // data validation
  const collectionDetailSchema = Joi.object().keys({
    name: Joi.string().min(0).max(127).required(),
    description: Joi.string().min(0).max(4095),
    user_id: Joi.string(),
  });

  const collectionDetailError = collectionDetailSchema.validate(collectionDetails).error;

  if (!(collectionDetailError == null)) {
    const errorMsg = collectionDetailError.details[0].message;
    console.log(errorMsg);
    res.status(422).json({
      message: errorMsg,
      data: null,
    });
    return;
  }

  const newCollection = await collectionService.create({
    name: collectionDetails.name,
    description: collectionDetails.description,
    user_id: collectionDetails.user_id,
  });

  if (newCollection == null) {
    res.status(422).json({
      message: 'failed to create collection',
      data: null,
    });
    return;
  }

  res.json({ data: { collection: newCollection } });
};

export const getAllCollection = async (req, res) => {
  const collections = await collectionService.readAll();
  res.json({ data: { collections } });
};
