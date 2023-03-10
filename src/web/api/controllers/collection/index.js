import * as collectionService from '../../../../services/collection';
import * as tagService from '../../../../services/tag';
import Joi from 'joi';
import { Buffer } from 'buffer';
// import fs from 'fs';
// import path from 'path';

const base64ImageToBuffer = (base64Data) => {
  const imageData = base64Data.replace(/^data:image\/\w+;base64,/, '');
  // var dataBuffer = new Buffer(imageData, 'base64');
  var dataBuffer = Buffer.from(imageData, 'base64');
  return dataBuffer;
};

const getImageType = (base64Data) => {
  const index = base64Data.indexOf(';');
  console.log(index);
  var temp = base64Data.substring(11, index);
  return temp;
};

export const bufferToBase64Image = (bufferData, imageType) => {
  const base64Str = bufferData.toString('base64');
  const base64Image = `data:image/${imageType};base64,${base64Str}`;
  // console.log(typeof bufferData);
  // var dataBuffer = new Buffer(base64Str, 'base64');
  // let ws = fs.createWriteStream(dataBuffer);
  return base64Image;
};

export const addCollection = async (req, res) => {
  // console.log(req);
  const data = req.body;
  // console.log(data);
  const collectionDetails = data.formData;
  const user = req.user;
  console.log(user._id.toString());

  // console.log(collectionDetails);
  console.log(getImageType(collectionDetails.image));

  // data validation
  const collectionDetailSchema = Joi.object().keys({
    name: Joi.string().min(0).max(127).required(),
    description: Joi.string().min(0).max(4095),
    user_id: Joi.string(),
    tags: Joi.string(),
    image: Joi.string(),
    // image: Joi.object(),
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

  // console.log(JSON.stringify(collectionDetails));
  // res.json({ data: { collection: collectionDetails } });

  console.log('-----------Joi-Validation-pass------------');
  const newCollection = await collectionService.create({
    name: collectionDetails.name,
    description: collectionDetails.description,
    tags: collectionDetails.tags,
    image: base64ImageToBuffer(collectionDetails.image),
    image_type: getImageType(collectionDetails.image),
    user_id: user._id.toString(), // collectionDetails.user_id,
  });
  // console.log(newCollection);

  if (newCollection == null) {
    res.status(422).json({
      message: 'failed to create collection',
      data: null,
    });
    return;
  }

  // const base64Img = bufferToBase64Image(
  //   newCollection.image.data,
  //   newCollection.image_type
  // );
  // console.log(base64Img.substring(0, 50));

  newCollection.image = newCollection.image != null ? newCollection._id.toString() : null;
  res.json({ data: { collection: newCollection } });
};

export const getUserCollections = async (req, res) => {
  const collections = await collectionService.readAllByUserId(req.user._id);
  const colls = collections?.map((collection) => {
    if (collection.image) collection.image = collection._id.toString();
    else collection.image = null;

    return collection;
  });
  res.json({ data: { collections: colls } });
};

export const getCollection = async (req, res) => {
  const collection = await collectionService.readById(req.params.id);
  if (collection.image) collection.image = collection._id.toString();
  else collection.image = null;
  res.json({ data: { collection } });
};

export const getCollectionImage = async (req, res) => {
  const imageType = req.params.type;
  const collectionId = req.params.id;

  const collection = await collectionService.readById(collectionId);

  if (collection?.image?.data && collection?.image?.type && collection?.image?.type === 'Buffer') {
    if (imageType && imageType === 'base64') {
      // // output base64 image
      const base64ImgStr = bufferToBase64Image(collection.image.data, collection.image_type);
      res.send(base64ImgStr);
    } else {
      res.set('content-type', { png: 'image/png', jpg: 'image/jpeg' });
      const dataBuffer = Buffer.from(collection.image.data.toString('hex'), 'hex');

      res.send(dataBuffer);
    }
  } else {
    // const readable = fs.readFileSync(
    //   path.join(__dirname, '/../../../collection-background.jpg'),
    //   'binary'
    // );
    // console.log(path.join(__dirname, 'collection-background.jpg'));
    // res.send(Buffer.from(readable, 'binary'));
    res.send('');
  }
};

export const updateCollection = async (req, res) => {
  // if just increment the click_count or favourite then it will just update and end
  console.log(req.body);
  if (req.body.collectionDetails) {
    const collection = await collectionService.update(req.params.id, req.body.collectionDetails);
    res.json({ data: { collection } });
  } else {
    const data = req.body;

    // console.log(data);
    const collectionDetails = data.formData;

    // console.log(collectionDetails);
    console.log(getImageType(collectionDetails.image));

    // data validation
    const collectionDetailSchema = Joi.object().keys({
      name: Joi.string().min(0).max(127).required(),
      description: Joi.string().min(0).max(4095),
      tags: Joi.string(),
      image: Joi.string(),
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
    console.log(updateCollection);
    const updateData = {
      name: collectionDetails.name,
      description: collectionDetails.description,
      tags: collectionDetails.tags,
      image: base64ImageToBuffer(collectionDetails.image),
      image_type: getImageType(collectionDetails.image),
    };

    const updatedCollection = await collectionService.update(req.params.id, updateData);
    if (updatedCollection == null) {
      res.status(422).json({
        message: 'failed to update collection',
        data: null,
      });
      return;
    }

    // const base64Img = bufferToBase64Image(
    //   newCollection.image.data,
    //   newCollection.image_type
    // );
    // console.log(base64Img.substring(0, 50));

    updatedCollection.image =
      updatedCollection.image != null ? updatedCollection._id.toString() : null;
    res.json({ data: { collection: updatedCollection } });
  }
};

export const deleteCollection = async (req, res) => {
  const newCollection = await collectionService.deleteById({
    collectionId: req.params.id,
  });
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
