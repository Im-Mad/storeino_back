exports.paginate = (req, list) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginate = {
        total: list.length,
        maxPages: Math.ceil(list.length/limit),
        currentPage: page,
        perPage: limit
    };

    list = list.slice(startIndex, endIndex);

    return {list ,paginate}
};