const Category = require("../models/CategoryModel")

module.exports.getCategory = (req, res) => {

    Category.find()
        .then(category => res.status(200).json({
            success: true,
            category: category.map(categories => ({
                _id: categories.id,
                name: categories.name,
                imageIcon: categories.imageIcon
            }))
        }))
        .catch(err => res.status(500).json({
            success: false,
            error: err
        }))

}


module.exports.addCategory = (req, res) => {


    const files = req.file;
    const imageName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/icon/`

    let newCategory = new Category({
        name: req.body.name,
        color: req.body.color,
        imageIcon: `${basePath}${imageName}`
    })

    if (!files) {
        return res.status(404).json({
            success: false,
            message: "Error , Nothing Image"
        })
    }

    newCategory.save()
        .then(categories => res.status(201).json({
            success: true,
            category: categories
        }))
        .catch(err => res.status(500).json({
            success: false,
            error: err
        }))

}


module.exports.getCategoryById = (req, res) => {

    Category.findById(req.params.id)
        .then(categoryId => {
            if (!categoryId) {
                return res.status(404).json({
                    success: false,
                    message: "Not Found categoryId"
                })
            }

            return res.status(200).json({
                success: true,
                category: categoryId
            })
        })
        .catch(err => res.status(400).json({
            success: false,
            error: err
        }))
}


module.exports.updateCategory = (req, res) => {

    Category.findByIdAndUpdate(req.params.id)
        .then(category => {
            category.name = req.body.name,
                category.color = req.body.color,
                category.imageIcon = req.body.imageIcon

            category.save()
                .then((categories) => res.status(200).json({
                    success: true,
                    message: "Succesfully Update Category by Id",
                    category: categories
                }))
                .catch(err => res.status(400).json({
                    success: false,
                    message: "Faied Update Bad Request",
                    error: err
                }))
        })
        .catch(err => res.status(404).json({
            success: false,
            error: err,
            message: "Failed update category Nothing Id"
        }))
}



module.exports.removeCategory = (req, res) => {

    Category.findByIdAndRemove(req.params.id)
        .then(categoryId => {
            if (!categoryId) {
                return res.status(404).json({
                    success: false,
                    message: "Delete Fail categoryId not found"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Delete Successfuly"
            })

        })
        .catch(err => res.status(400).json({
            success: false,
            message: "Error Bad Request",
            error: err
        }))

}
