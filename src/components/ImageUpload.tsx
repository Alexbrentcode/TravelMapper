import { FC } from "react"
import exifr from "exifr";
import { ImageUploadInterface } from "../interfaces/SharedInterfaces";

const ImageUpload: FC<ImageUploadInterface> = ({ setImageMetaData, setImagesWithoutGPSMetaData }) => {


    const resetUploadedImageState = () => {
        // Reset current state to avoid duplicating items in state
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
                border: '1px solid red', width: 480, height: 680, flexDirection: 'column', display: 'flex',
                alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 5, backgroundColor: 'white'
            }}>
                <h1>Travel Mapper</h1>
                {/* <h2>Where did your trip begin?</h2>
                <input type="text" />
                <h2>Where did your trip end?</h2>
                <input type="text" />
                <h2>Upload your images</h2> */}
                <input type='file' name='imageTest' multiple={true} onChange={(e) => { processImage(e) }} />
                {/* <div style={{ border: '1px solid black', width: 'auto', height: '50%', overflowY: 'scroll', textAlign: 'left', paddingLeft: 50 }}>
                    {imageMetaData.length > 0 && (
                        imageMetaData.map((imageData: any) => {
                            return (
                                <>
                                    <p>Lat: {imageData.latitude}</p>
                                    <p>Long: {imageData.longitude} </p>
                                </>
                            )
                        })
                    )
                    }
                </div> */}
            </div >
        </>

    )


}

export default ImageUpload