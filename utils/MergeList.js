function Merge(baseList, complementaryList)  {

    const mergedList = baseList.map( (product) => {
        const complementaryProduct = complementaryList.find(prdct => prdct._id === product._id);
        if(complementaryProduct)
        {
            return {...product,...complementaryProduct._doc};
        }
    });

    return mergedList;
}

module.exports = Merge;