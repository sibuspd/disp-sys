const GalleryModel = require("../Models/gallery");

// API for adding images to the gallery
exports.addImage = async (req, res) => {
    try{
        const {link} = req.body;
        const image = new GalleryModel({link, addedBy: req.user._id}); // Link is fed to Image object
        await image.save(); // Saving the image object to DB
        res.status(201).json({
            message: 'Image added successfully',
            image
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
            issue: err.message
        });
    }
}

// Display all Images
exports.getAllImages = async (req, res) => {
    try{
        const images = await GalleryModel.find(); // Fetching all images from DB
        return res.status(200).json({
            message: "Images fetched successfully",
            images
        }); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
            issue: err.message
        });
    }
}

// Delete an Image
exports.deleteImageById = async (req, res) => {
    try{
        const {id} = req.params;
        const image = await GalleryModel.findByIdAndDelete(id);
        if(image){
            return res.status(200).json({
                message: 'Image deleted successfully'
            });
        }
        return res.status(404).json({
            error: 'Image not found'
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
            issue: err.message
        });
    }
}