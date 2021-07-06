const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");


module.exports.getProduct = (req, res) => {

    let filter = {};


    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }

    } else if (req.query.name) {
        filter = { name: { '$regex': req.query.name, $options: 'i' } }
    }

    Product.find(filter).select('name image brand price rating category')
        .populate('category')
        .then(product => res.status(200).json({
            success: true,
            product: product
        }))
        .catch(err => res.status(400).json({
            success: false,
            message: "Error Internal Server Error",
            error: err
        }))
}

module.exports.addProduct = (req, res) => {

    const files = req.file;
    const imageName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`

    const categoryId = Category.findById(req.body.category);

    if (!categoryId) {
        return res.status(404).json({
            success: false,
            message: "Invalid Id Category"
        })
    } else if (!files) {
        return res.status(404).json({
            success: false,
            message: "Error , Nothing Image"
        })
    }



    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${imageName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured

    })

    newProduct.save()
        .then(product => res.status(201).json({
            success: true,
            message: "Add Product Success",
            product: product
        }))
        .catch(err => res.status(500).json({
            success: false,
            message: "Error Internal Server Error",
            error: err
        }))

}

module.exports.getProductById = (req, res) => {

    Product.findById(req.params.id).populate('category')
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Nothing Product Id"
                })
            }

            return res.status(200).json({
                success: true,
                product: product
            })
        })
        .catch(err => res.status(500).json({
            success: false,
            message: "Error  Internal Server Error",
            error: err
        }))
}

module.exports.updateProduct = (req, res) => {


    // category
    const categoryId = Category.findById(req.body.category)
    if (!categoryId) {
        return res.status(404).json({
            success: false,
            message: "Nothing Id Category"
        })

    }

    // imageUpdate
    const files = req.file;
    let imagePath;

    if (files) {
        const fileName = files.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
        imagePath = `${basePath}${fileName}`;
    } else {
        imagePath = product.image;
    }


    Product.findByIdAndUpdate(req.params.id)
        .then(product => {
            product.name = req.body.name,
                product.description = req.body.description,
                product.richDescription = req.body.richDescription,
                product.image = imagePath,
                product.brand = req.body.brand,
                product.price = req.body.price,
                product.category = req.body.category,
                product.countInStock = req.body.countInStock,
                product.rating = req.body.rating,
                product.numReviews = req.body.numReviews,
                product.isFeatured = req.body.isFeatured

            product.save()
                .then(products => {
                    return res.status(200).json({
                        success: true,
                        message: "Success Update Product",
                        product: products
                    })
                }).catch(err => {
                    res.status(400).json({
                        success: false,
                        message: "Failed update Product ",
                        Error: err
                    })
                })
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: "Error Internal Server Error",
                Error: err
            })
        })

}


module.exports.removeProduct = (req, res) => {

    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Nothing Product Id"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Success Delete Product"
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Error Internal Server Error",
                error: err
            })
        })
}

module.exports.getProductByFeatured = (req, res) => {
    const count = req.params.count ? req.params.count : 0
    Product.find({ isFeatured: true }).limit(+count)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Nothing Product"
                })
            }

            return res.status(200).json({
                success: true,
                product: product
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Error Internal Server Error",
                error: err
            })
        })
}

module.exports.getImageList = async (req, res) => {


    let imagePaths = [];
    const files = req.files;
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;

    if (files) {
        files.map(file => {
            imagePaths.push(`${basePath}${file.filename}`)
        })
    }


    Product.findOneAndUpdate(req.params.id)
        .then(product => {
            product.images = imagePaths

            product.save()
                .then(products => {
                    res.status(200).json({
                        success: true,
                        message: "Update Success",
                        product: products
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        success: false,
                        message: "Update Failed",
                        error: err
                    })
                })

        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "500 Internal Server Error",
                error: err
            })
        })

}