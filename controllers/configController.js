const catchAsync = require('../utils/catchAsynch');
const Config = require('../models/configModel')
const AppError = require("../utils/AppError");
const Api = require("../utils/StoreinoAPI");

exports.getSlides = catchAsync(async (req, res, _next) => {
  const slides = await Config.findOne({type: 'slides'});
  if(slides === null) {
    return _next(new AppError("Slides not found", 404));
  }
  res.status(200).json({
    results: slides
  });
});

exports.getBanner = catchAsync(async (req, res, _next) => {
  const banner = await Config.findOne({type: 'banner'});
  if(banner === null) {
    return _next(new AppError("Banner not found", 404));
  }
  res.status(200).json({
    result: banner
  });
});

exports.getTopCategories = catchAsync(async (req, res, _next) => {
  const topCat = await Config.findOne({type: 'top'});
  if(topCat === null) {
    return _next(new AppError("Top categories not found", 404));
  }
  res.status(200).json({
    results: topCat
  });
});

exports.getFeaturedCategories = catchAsync(async (req, res, _next) => {
  const featuredCat = await Config.findOne({type: 'featured'});
  if(featuredCat === null) {
    return _next(new AppError("Featured categories not found", 404));
  }
  res.status(200).json({
    results: featuredCat
  });
});

exports.editSlides = catchAsync(async (req, res, _next) => {
  const {slide, imgChanged} = req.body;
  if (imgChanged){
    const response = await Api.adminPost('images','create',  {
      src: slide.image
    });
    slide.image = response.data.src;
  }
  const resp = await Config.findOne({type: 'slides'});
  let slides = resp._doc.slides;
  if(!slides) {
    res.status(500).json({
      error: "fuck bro"
    });
  }
else
  slides = slides.map( item => {
    if(slide._id === item._id)
      return slide;
    return item;
  });

  console.log(slides);
  const respo = Config.updateOne(
    {type: 'slides'},
    [{$set: {slides}}]
  ).catch(err => console.log(resp));

  res.status(204).send();
});

exports.editBanner = catchAsync(async (req, res, _next) => {

  const {banner} = req.body;
  if (banner.image){
    const response = await Api.adminPost('images','create',  {
      src: banner.image
    });
    banner.image = response.data.src;
  }

  await Config.updateOne(
    {type: 'banner'},
    [{$set: {banner}}]
  );

  res.status(204).send();
});


exports.editTopCategories = catchAsync(async (req, res, _next) => {
  const {top} = req.body;

  await Config.updateOne(
    {type: 'top'},
    [{$set: {top}}]
  );

  res.status(204).send();
});


exports.editFeaturedCategories = catchAsync(async (req, res, _next) => {
  const {featured} = req.body;

  await Config.updateOne(
    {type: 'featured'},
    [{$set: {featured}}]
  );

  res.status(204).send();
});