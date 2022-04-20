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

exports.getShippers = catchAsynch(async (req, res, _next) => {
    // const response = await Api.get('countries','search');
    const response = {
        results: [
            {
                zipCodes: [],
                _id: "6257ecca4c52160fdc5d79bb",
                name: "Agadir",
                description: null,
                shippers: [
                    {
                        _id: "6257ec734c52160fdc5d7952",
                        name: "delivery guy 1",
                        price: 0
                    }
                ],
                shippingRates: [
                    {
                        minWeight: 0,
                        maxWeight: 1,
                        unite: "KG",
                        value: 0,
                        _id: "6257ee094c52160fdc5d7ae6"
                    }
                ],
                storeId: "6202fab612f2fd0809ed2fd0",
                __v: 0
            },
            {
                zipCodes: [],
                _id: "6257ed684c52160fdc5d7a65",
                name: "agadir premium",
                description: null,
                shippers: [
                    {
                        _id: "6257ec8b4c52160fdc5d796f",
                        name: "Delivery guy 2",
                        price: 0
                    }
                ],
                shippingRates: [
                    {
                        minWeight: 0,
                        maxWeight: 1,
                        unite: "KG",
                        value: 50,
                        _id: "6257ee204c52160fdc5d7aea"
                    }
                ],
                storeId: "6202fab612f2fd0809ed2fd0",
                __v: 0
            }
        ],
        paginate: {
            total: 2,
            per_page: 20,
            current_page: 1,
            last_page: 1
        }
    };
    const shippers = [];
    response.results.forEach(item => shippers.push(...item.shippers))
    res.status(200).json({
        results: shippers,
        ...response.paginate
    });
});

exports.getMethods = catchAsynch(async  (req, res, _next) => {
    res.status(200).json({
        results: [

            {
                _id: "5feb408a2ef4130539efb9e0",
                name: "CashOnDelivery"
            },
            {
                _id: "5feb408a2ef4130539efb9e1",
                name: "Paypal"
            }
        ]
    })
});