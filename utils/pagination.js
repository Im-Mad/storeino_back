exports.paginate = (req, productList) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginate = {
        total: productList.length,
        maxPages: Math.ceil(productList.length/limit),
        currentPage: page,
        perPage: limit
    };

    productList = productList.slice(startIndex, endIndex);

    return {productList ,paginate}
};