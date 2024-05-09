const cloudinary = require("cloudinary").v2;
const { log } = require("console");
// const cloudinary = v2;
const fs = require("fs");

         
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log(response)
        fs.unlinkSync(localFilePath)
        return response;
    }
    catch (error){
            fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed 
            return null;
    }
}

const deleteOnCloudinary = async (url, type = null) => {

    let temp = String(url);
    temp = temp.substring(temp.lastIndexOf("/")+1);
    let publicId = temp.substring(0, temp.lastIndexOf("."));
    // console.log(publicId)
    if(type == "video"){
        const response = await cloudinary.uploader.destroy(publicId, {resource_type: 'video'}) 
        return response;
    }
    else{
        const response = await cloudinary.uploader.destroy(publicId)
        console.log(response);
        return response;
    }
    // console.log(response)
}



module.exports = {uploadOnCloudinary, deleteOnCloudinary}