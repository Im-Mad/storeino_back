const categories = [
    {
        "parents": [
            {
                "name": "Men Apparels",
                "slug": "men-apparels"
            }
        ],
        "children": [
            {
                "slug": "men-apparels:men-t-shirts:nike-t-shirts",
                "name": "Nike T-shirts"
            }
        ],
        "_id": "6236f11531c0991f3b0903f5",
        "name": "Men T-Shirts",
        "slug": "men-apparels:men-t-shirts",
        "level": 1
    },
    {
        "parents": [
            {
                "name": "Men Apparels",
                "slug": "men-apparels"
            }
        ],
        "children": [],
        "_id": "6236f11531c0991f3b0903fb",
        "name": "Sneakers",
        "slug": "men-apparels:sneakers",
        "level": 1
    },
    {
        "parents": [
            {
                "name": "Women Apparels",
                "slug": "women-apparels"
            }
        ],
        "children": [],
        "_id": "6236f11631c0991f3b090403",
        "name": "Women T-Shirts",
        "slug": "women-apparels:women-t-shirts",
        "level": 1
    }
];
console.log(JSON.stringify(categories[0].parents[0]) === JSON.stringify(categories[1].parents[0]));
const map = new Map();
let value;

categories.forEach(category => {
    const key = JSON.stringify(category.parents[0])
    if(map.has(key)) {
        value = map.get(key);
        value = value.push(category);
        map.set(key,value);
    } else {
        map.set(key,[category]);
    }
});

