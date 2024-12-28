const Location = require('../models/Location');
const NotFoundException = require('../errors/exception');
const { findById } = require('../models/User');
const cloudinary =  require("../config/cloudinaryConfig") 
const emailSvc = require('./emailSvc')

const createLocation = async (locationData, imageFiles) => {
    const imageUrls = []
    if(imageFiles && imageFiles.length > 0) {
        for(let image of imageFiles) {
            const buffer = await image.toBuffer()
            const upload = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({folder: 'travel-social'}, (error, result) => {
                    if(error)
                        return reject(new NotFoundException('Cannot upload'))
                    resolve(result)
                }).end(buffer)
            })
            imageUrls.push(upload.secure_url)
        }
    }
    locationData.image = imageUrls
    const savedLocation = await locationData.save();
    if(savedLocation)
        return savedLocation;
    else
        throw new NotFoundException('Cannot create new location');
}

const createLocationWithImage = async (locationData) => {
    const savedLocation = await locationData.save();
    if(savedLocation)
        return savedLocation;
    else {
        for (let image of images) {
            await cloudinary.uploader.destroy(image.url)
        }
        throw new NotFoundException('Cannot create new location');
    }
}
        

const getAllLocation = async () => {
    const allLocation = await Location.find();
    if(allLocation.length !== 0)
        return allLocation;
    else
        throw new NotFoundException('Not found any location in database');
}

const getLocationByCategory = async (categoryId) => {
    const locations = await Location.find({'category.id': categoryId});
    if(locations.length != 0)
        return locations;
    else
        throw new NotFoundException('Not found this category location');
}

const getLocationByUserId = async (userId) => {
    const locations = await Location.find({ownerId: userId});
    if(locations.length != 0)
        return locations;
    else
        throw new NotFoundException('Not found this user location');
}

const getLocationByName = async (name) => {
    const locations = await Location.find({ name: new RegExp(name, 'i') });
    if(locations.length != 0)
        return locations;
    else
        throw new NotFoundException('Not found this location');
    //Thêm chức năng tìm kiếm không dấu: thêm một trường tên không dấu trong database.
    //Tìm kiếm không theo thứ tự: tìm hiểu TFIDF
    //VN core nlp
}

const getLocationById = async (locationId) => {
    const location = await Location.findById(locationId);
    if(location)
        return location;
    else
        throw new NotFoundException('Not found this location');
}

const updateLocation = async(locationId, updateData) => {
    const updatedLocation = await Location.findByIdAndUpdate(locationId, updateData, {new: true, runValidators: true})
    if(updatedLocation)
        return updatedLocation
    else
        throw new NotFoundException('Not found location to update')
}

const deleteLocation = async(locationId) => {
    const deletedLocation = await Location.findByIdAndDelete(locationId)
    if(deletedLocation)
        return deletedLocation
    else
        throw new NotFoundException('Not found location to delete')
}

const getInfoOwnerByLocationId = async (locationId) => {
    const result = await Location.findById(locationId).populate('ownerId')
    if(result)
        return result
    else
        throw new NotFoundException('Not found this location')
}

const sendAppoveEmailService = async (email) => {
    const transporter = emailSvc.transporter
    const approveMail = emailSvc.approveMail(email, email)
    transporter.sendMail(approveMail, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        return info
    });
}
module.exports = {
    getAllLocation, 
    createLocation,
    createLocationWithImage,
    getLocationByCategory,
    getLocationByUserId,
    getLocationByName,
    getLocationById,
    updateLocation,
    deleteLocation,
    getInfoOwnerByLocationId,
    sendAppoveEmailService
}