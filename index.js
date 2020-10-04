const Commerce = require('@chec/commerce.js')

const CommercejsPlugin = async (api, options) => {
  if (!options.publicKey)
    throw new Error('gridsome-source-commercejs: Missing Public Key')

  const commerce = new Commerce(options.publicKey)

  api.loadSource(async actions => {
    console.log('🛒 Fetching products from Commerce.js...')

    const { data: products } = await commerce.products.list()
    const { data: categories } = await commerce.categories.list()

    const productCollection = actions.addCollection({
      typeName: 'CommercejsProducts',
    })
    const categoriesCollection = actions.addCollection({
      typeName: 'CommercejsCategories',
    })

    for (const item of products) {
      productCollection.addNode(item)
    }

    for (const item of categories) {
      categoriesCollection.addNode(item)
    }

    console.log('✔️ Done fetching products from Commerce.js!')
  })
}

module.exports = CommercejsPlugin
