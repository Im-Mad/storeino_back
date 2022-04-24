const catchAsynch = require("../utils/catchAsynch");
const Api = require("../utils/StoreinoAPI");

exports.getCountries = catchAsynch(async (req, res, _next) => {
    const response = await Api.get('locations','search');
    res.status(200).json({
        results: response.data.results
    });
});

exports.getProvinces = catchAsynch(async (req, res, _next) => {
    const response = await Api.get('locations','search', req.query);
    res.status(200).json({
        results: response.data.results
    });
});

exports.getShippers = catchAsynch(async (req, res, _next) => {
    const response = await Api.get('zones','search', req.query);
    const shippers = [];
    response.data.results.forEach(item => item.shippers.forEach(shipper => shippers.push({...shipper, zone:{_id: item._id, name: item.name}})));
    res.status(200).json({
        results: shippers,
        paginate: response.data.paginate
    });
});

exports.getMethods = catchAsynch(async  (req, res, _next) => {
    const response = await Api.get('methods','search');
    res.status(200).json({
        results: response.data.results
    })
});