import * as tagService from '../../../../services/tag';
import Joi from 'joi';

export const addTag = async (req, res) => {
  const data = req.body;
  const tagDetails = data.tagDetails;

  // data validation
  const tagDetailSchema = Joi.object().keys({
    name: Joi.string().min(0).max(63).required(),
  });

  const tagDetailError = tagDetailSchema.validate(tagDetails).error;

  if (!(tagDetailError == null)) {
    const errorMsg = tagDetailError.details[0].message;
    console.log(errorMsg);
    res.status(422).json({
      message: errorMsg,
      data: null,
    });
    return;
  }

  const newTag = await tagService.create({
    name: tagDetails.name,
  });

  if (newTag == null) {
    res.status(422).json({
      message: 'failed to create tag',
      data: null,
    });
    return;
  }

  res.json({ data: { tag: newTag } });
};

export const getTag = async (req, res) => {
  const tag = await tagService.readById(req.params.id);
  res.json({ data: { tag } });
};

export const updateTag = async (req, res) => {
  const newTag = await tagService.update(req.params.id, req.body.tagDetails);
  res.json({ data: { newTag } });
};

export const deleteTag = async (req, res) => {
  const newTag = await tagService.deleteById({ tagId: req.params.id });
  res.json({ data: { newTag } });
};
