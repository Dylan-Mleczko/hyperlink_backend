import * as linkService from '../../../../services/link';
import Joi from 'joi';

export const registerLink = async (req, res) => {
  const data = req.body;
  const linkDetails = data.linkDetails;

  // data validation
  const linkDetailSchema = Joi.object().keys({
    uri: Joi.string().min(0).required().uri(),
    name: Joi.string().min(0).max(127),
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
  const links = await linkService.readAll();
  res.json({ data: { links } });
};

export const getLink = async (req, res) => {
  const link = await linkService.readById(req.params.id);
  res.json({ data: { link } });
};

export const updateLink = async (req, res) => {
  const newLink = await linkService.update(req.params.id, req.body.linkDetails);
  res.json({ data: { newLink } });
};

export const deleteLink = async (req, res) => {
  const newLink = await linkService.deleteById({ linkId: req.params.id });
  res.json({ data: { newLink } });
};
