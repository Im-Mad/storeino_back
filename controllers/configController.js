const catchAsynch = require('../utils/catchAsynch');
const Config = require('../models/configModel')
const AppError = require("../utils/AppError");

exports.getSlides = catchAsynch(async (req, res, _next) => {
  const slides = await Config.findOne({type: 'slides'});
  if(slides === null) {
    return _next(new AppError("Slides not found", 404));
  }
  res.status(200).json({
    results: slides
  });
});

exports.getBanner = catchAsynch(async (req, res, _next) => {
  const banner = await Config.findOne({type: 'banner'});
  if(banner === null) {
    return _next(new AppError("Banner not found", 404));
  }
  res.status(200).json({
    result: banner
  });
});

exports.getTopCategories = catchAsynch(async (req, res, _next) => {
  const topCat = await Config.findOne({type: 'top'});
  if(topCat === null) {
    return _next(new AppError("Top categories not found", 404));
  }
  res.status(200).json({
    results: topCat
  });
});

exports.getFeaturedCategories = catchAsynch(async (req, res, _next) => {
  const featuredCat = await Config.findOne({type: 'featured'});
  if(featuredCat === null) {
    return _next(new AppError("Featured categories not found", 404));
  }
  res.status(200).json({
    results: featuredCat
  });
});

exports.editSlides = catchAsynch(async (req, res, _next) => {
  const {slide} = req.body;
  let slides = await Config.findOne({type: 'slides'});
  if(slides === null) {
    return _next(new AppError("Slides not found", 404));
  }

  slides = slides.map( item => {
    if(slide._id === item._id)
      return slide;
    return item;
  });

  await Config.updateOne(
    {type: 'slides'},
    [{$set: {slides}}]
  );

  res.status(204).send();
});

exports.editBanner = catchAsynch(async (req, res, _next) => {
  const {banner} = req.body;

  await Config.updateOne(
    {type: 'banner'},
    [{$set: {banner}}]
  );

  res.status(204).send();
});


exports.editTopCategories = catchAsynch(async (req, res, _next) => {
  const {top} = req.body;

  await Config.updateOne(
    {type: 'top'},
    [{$set: {top}}]
  );

  res.status(204).send();
});


exports.editFeaturedCategories = catchAsynch(async (req, res, _next) => {
  const {featured} = req.body;

  await Config.updateOne(
    {type: 'featured'},
    [{$set: {featured}}]
  );

  res.status(204).send();
});