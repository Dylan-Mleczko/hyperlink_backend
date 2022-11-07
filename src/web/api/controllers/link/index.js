import * as linkService from '../../../../services/link';
import Joi from 'joi';
// import mongoose from 'mongoose';

export const addLink = async (req, res) => {
  const linkDetails = req.body;
  // const linkDetails = data.linkDetails;
  console.log(linkDetails);

  // data validation
  const linkDetailSchema = Joi.object().keys({
    uri: Joi.string().min(0).required().uri(),
    name: Joi.string().min(0).max(127),
    description: Joi.string().min(0).max(500),
    collection_id: Joi.string(),
  });

  const linkDetailError = linkDetailSchema.validate(linkDetails).error;

  if (!(linkDetailError == null)) {
    const errorMsg = linkDetailError.details[0].message;
    console.log(errorMsg);
    res.status(422).json({
      message: errorMsg,
      data: null,
    });
    return;
  }

  const newLink = await linkService.create({
    uri: linkDetails.uri,
    name: linkDetails.name,
    description: linkDetails.description,
    collection_id: linkDetails.collection_id,
  });

  if (newLink == null) {
    res.status(422).json({
      message: 'failed to create link',
      data: null,
    });
    return;
  }

  res.json({ data: { link: newLink } });
};

export const getAllLink = async (req, res) => {
  // const collections = await collectionService.readAllByUserId(req.user._id);
  // const colls = collections?.map((collection) => {
  //   if (collection.image) collection.image = collection._id.toString();
  //   else collection.image = null;

  //   return collection;
  // });
  // res.json({ data: { collections: colls } });
  // const collectionId = new mongoose.Types.ObjectId(req.params.id);
  const collectionId = req.params.id.slice(1);
  console.log(collectionId);
  const links = await linkService.readAllByCollectionId(collectionId);
  res.json({ data: { links } });
};

export const getLink = async (req, res) => {
  const link = await linkService.readById(req.params.id);
  res.json({ data: { link } });
};

export const updateLink = async (req, res) => {
  const linkDetails = req.body.linkDetails;
  // data validation
  const linkDetailSchema = Joi.object().keys({
    uri: Joi.string().min(0).required().uri(),
    name: Joi.string().min(0).max(127),
    description: Joi.string().min(0).max(500),
  });

  const linkDetailError = linkDetailSchema.validate(linkDetails).error;

  if (!(linkDetailError == null)) {
    const errorMsg = linkDetailError.details[0].message;
    console.log(errorMsg);
    res.status(422).json({
      message: errorMsg,
      data: null,
    });
    return;
  }

  const newLink = await linkService.update(req.params.id, linkDetails);
  console.log(req.body);
  if (newLink == null) {
    res.status(422).json({
      message: 'failed to create link',
      data: null,
    });
    return;
  }
  res.json({ data: { newLink } });
};

export const deleteLink = async (req, res) => {
  const newLink = await linkService.deleteById({ linkId: req.params.id });
  res.json({ data: { newLink } });
};
