const catchAsynch = require("../utils/catchAsynch");
const Api = require("../utils/StoreinoAPI");

exports.getCountries = catchAsynch(async (req, res, _next) => {
    // const response = await Api.get('countries','search');

    res.status(200).json({
        results: [
            {
                _id: '5fe34e832c340e031376e650',
                name: 'Morocco'
            }
        ]
    });
});

exports.getProvinces = catchAsynch(async (req, res, _next) => {
    // const response = await Api.get('countries','search');

    res.status(200).json({
        results: [
            {
                name: "Tanger-Tétouan-Al Hoceïma",
                _id: "5fe34e832c340e031376e651"
            },
            {
                name: "l'Oriental",
                _id: "5fe34e832c340e031376e67a"
            },
            {
                name: "Fès-Meknès",
                _id: "5fe34e832c340e031376e6ab"
            },
            {
                name: "Rabat-Salé-Kénitra",
                _id: "5fe34e832c340e031376e6e1"
            },
            {
                name: "Béni Mellal-Khénifra",
                _id: "5fe34e832c340e031376e702"
            },
            {
                name: "Casablanca-Settat",
                _id: "5fe34e832c340e031376e72d"
            },
            {
                name: "Marrakech-Safi",
                _id: "5fe34e832c340e031376e759"
            },
            {
                name: "Drâa-Tafilalet",
                _id: "5fe34e832c340e031376e786"
            },
            {
                name: "Souss-Massa",
                _id: "5fe34e832c340e031376e7ae"
            },
            {
                name: "Guelmim-Oued Noun",
                _id: "5fe34e832c340e031376e7da"
            },
            {
                name: "Laâyoune-Sakia El Hamra",
                _id: "5fe34e832c340e031376e7e3"
            },
            {
                name: "Dakhla-Oued Ed Dahab",
                _id: "5fe34e832c340e031376e7e9"
            }
        ]
    });
});