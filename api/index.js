const getSectionList = async () => {
    const { default: names } = await import('@/assets/data/names.json')
    return Object.entries(names)
        .map(([sectionId, section]) => ({
            id: sectionId,
            name: section.G,
        }))
}

const getProductList = async () => {
    const [
        { default: data },
        { default: names },
    ] = await Promise.all([
        import('@/assets/data/data.json'),
        import('@/assets/data/names.json'),
    ])
    return data.Value?.Goods?.map?.(product => ({
        id: product.T,
        sectionId: product.G,
        name: names[product.G][product.T],
        price: product.C,
        quantity: product.P,
    }))
}

export default {
    getSectionList,
    getProductList,
}
