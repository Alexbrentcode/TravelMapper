import { FC } from "react"
import exifr from "exifr";
import { ImageUploadInterface } from "../interfaces/SharedInterfaces";

const ImageUpload:FC<ImageUploadInterface> = ({setImageMetaData}) => {

    const resetUploadedImageState = () => {
        // Reset current state to avoid duplicating items in state
        setImageMetaData([])
    }

    const processImage = async (image: any) => {
        resetUploadedImageState();
        const imageFileArray = Array.from(image.target.files)
        console.log(`Total file is ${JSON.stringify(image.target.files[0].name)}`)
        
        for(let i = 0; i < imageFileArray.length; i++){
            const thisImage: any = imageFileArray[i];
            const fileUrl = window.URL.createObjectURL(thisImage);
            if( await exifr.gps(fileUrl)){
                let {latitude, longitude} = await exifr.gps(fileUrl)
                setImageMetaData((prevState: any) => [...prevState, {imageUrl: fileUrl, imageName: thisImage.name, latitude: latitude, longitude: longitude}]);
            }

        }
    }
    return (
        <>
            <h2>Upload your image</h2>
            <input type='file' name='imageTest' multiple={true} onChange={(e) => {processImage(e)}} />
        </>
    )
    

}

export default ImageUpload