import * as linkService from '../../../../services/link';
import Joi from 'joi';
import Puppeteer from 'puppeteer';
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

export const scrapeLink = async (req, res) => {
  console.log('link scraped!!');
  const link = req.body.domain;
  // data validation
  const linkDetails = { uri: link };
  const linkDetailSchema = Joi.object().keys({
    uri: Joi.string().min(0).required().uri(),
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
  var browser;
  var data = {};

  console.log(link);
  const scrape = async () => {
    browser = await Puppeteer.launch({
      headless: true,
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      ignoreHTTPSErrors: true,
    });
    // const browser = await browserObject.;

    let page = await browser.newPage();

    // // Catch all failed requests like 4xx..5xx status codes
    // page.on('requestfailed', (request) => {
    //   console.log(
    //     `url: ${request.url()}, errText: ${
    //       request.failure().errorText
    //     }, method: ${request.method()}`
    //   );
    // });
    // // Catch console log errors
    // page.on('pageerror', (err) => {
    //   console.log(`Page error: ${err.toString()}`);
    // });
    // // Catch all console messages
    // page.on('console', (msg) => {
    //   console.log('Logger:', msg.type());
    //   console.log('Logger:', msg.text());
    //   console.log('Logger:', msg.location());
    // });
    try {
      // try {
      console.log(`Navigating to ${link}...`);
      await page.goto(link);
      // } catch (e) {
      //   console.log('scrape failed by', e);
      //   // res.status(422).json({
      //   //   message: 'failed to scrape link',
      //   //   data: null,
      //   // });
      //   // return;
      // }
      // await page.waitFor(10000); // To be sure all exceptions logged and handled
      let scrapedData = {};
      scrapedData.title = await page.title();
      const descMeta = await page.$('[name=description]');
      if (descMeta) {
        scrapedData.description = await (await descMeta.getProperty('content')).jsonValue();
      }
      await browser.close();
      return scrapedData;
    } catch (err) {
      console.log('scrape failed by', err);
      res.status(422).json({
        message: 'failed to scrape link',
        data: null,
      });
      return;
    }
  };

  data = await scrape();
  if (data) {
    console.log(data);
    res.json({ data });
  }
};
