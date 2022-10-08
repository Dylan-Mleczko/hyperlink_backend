import * as collectionService from '../../../../services/collection';
import * as tagService from '../../../../services/tag';
import Joi from 'joi';

export const addCollection = async (req, res) => {
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

export const getUserCollections = async (req, res) => {
  const collections = await collectionService.readAllByUserId(req.user._id);
  res.json({ data: { collections } });
};

export const getCollection = async (req, res) => {
  const collection = await collectionService.readById(req.params.id);
  res.json({ data: { collection } });
};

export const updateCollection = async (req, res) => {
  const collection = await collectionService.update(req.params.id, req.body.collectionDetails);
  res.json({ data: { collection } });
};

export const deleteCollection = async (req, res) => {
  const newCollection = await collectionService.deleteById({ collectionId: req.params.id });
  res.json({ data: { newCollection } });
};

export const addTagToCollection = async (req, res) => {
  // check for existing tag with name
  var exists = false;
  var addTag = null;
  const existingCollection = await collectionService.readById(req.body.collection_id);
  const newTagName = req.body.tagDetails.name;

  // check if any other collections of the user have the tag
  const collections = await collectionService.readAllByUserId(req.body.user_id);
  for (const collection of collections) {
    for (const tag of collection.tags) {
      if (tag.name === newTagName) {
        if (collection.id === existingCollection.id) {
          exists = true;
        } else {
          addTag = tag;
        }
      }
    }
  }

  if (!exists) {
    if (addTag == null) {
      console.log('creating new tag');
      addTag = await tagService.create(req.body.tagDetails);
    }
    const newCollection = await collectionService.update(req.body.collection_id, {
      tags: [...existingCollection.tags, addTag],
    });
    res.json({ data: { newCollection } });
    return;
  }

  // check if the collection already contains the tag
  res.json({ res: 'tag already exists in collections' });
};
