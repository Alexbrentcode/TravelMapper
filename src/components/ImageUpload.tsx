import { FC } from "react"
import exifr from "exifr";
import { ImageUploadInterface } from "../interfaces/SharedInterfaces";

const ImageUpload: FC<ImageUploadInterface> = ({ setImageMetaData, setImagesWithoutGPSMetaData }) => {
    // Reset current state to avoid duplicating items in state
    const resetUploadedImageState = () => {
        setImageMetaData([])
    }

    const processImage = async (image: any) => {
        resetUploadedImageState();
        const imageFileArray = Array.from(image.target.files)

        for (let i = 0; i < imageFileArray.length; i++) {
            const thisImage: any = imageFileArray[i];
            const fileUrl = window.URL.createObjectURL(thisImage);
            if (await exifr.gps(fileUrl)) {
                let { latitude, longitude } = await exifr.gps(fileUrl)
                let testAllData = await exifr.parse(fileUrl);
                setImageMetaData((prevState: any) => [...prevState, { imageUrl: fileUrl, imageName: thisImage.name, latitude: latitude, longitude: longitude, orientation: testAllData.Orientation, dateTime: testAllData.DateTimeOriginal }]);
            } else {
                setImagesWithoutGPSMetaData((prevState: any) => [...prevState, { imageUrl: fileUrl, imageName: thisImage.name, imgObj: thisImage }])
            }
        }
    }
    return (
        <>
            <div style={{
                border: '1px solid red', width: 480, height: '100%', flexDirection: 'column', display: 'flex',
                alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 5, backgroundColor: 'white'
            }}>
                <h1>Travel Mapper</h1>
                <input type='file' name='imageTest' multiple={true} onChange={(e) => { processImage(e) }} />
            </div >
        </>

    )


}

export default ImageUpload