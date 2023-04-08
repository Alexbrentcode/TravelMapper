import { useEffect, useState } from "react";
import exifr from "exifr";
import GoogleMap from "../components/GoogleMap";

interface MetaDataInterface {
    imageUrl: string,
    latitude: number | undefined,
    longitude: number | undefined,
}

const Homepage = () => {

    const [imageMetaData, setImageMetaData] = useState<MetaDataInterface[]>([]);

    const processImage = async (image: any) => {
        // Reset current state to avoid duplicating items in state
        setImageMetaData([])
        const imageFileArray = Array.from(image.target.files)
        
        for(let i = 0; i < imageFileArray.length; i++){
            const thisImage: any = imageFileArray[i];
            const fileUrl = window.URL.createObjectURL(thisImage);
            let {latitude, longitude} = await exifr.gps(fileUrl)
            setImageMetaData((prevState) => [...prevState, {imageUrl: fileUrl, latitude: latitude, longitude: longitude}]);
        }
    }

    //TODO: Remove - logging data
    useEffect(() => {
        imageMetaData.forEach((img) => {
            console.log(img)
        })
        console.log(`Arr length is ${imageMetaData.length}`)
    }, [imageMetaData])
  
    return (
        <>
        <div style={{border: '1px solid black', width: 480, height: 480, flexDirection: 'inherit', display: 'flex', alignItems: 'inherit', justifyContent: 'inherit'}}>
          <h2>Upload your image</h2>
          <input type='file' name='imageTest' multiple={true} onChange={(e) => {processImage(e)}} />
          <div>
            {imageMetaData &&
            <>
            {/* <p>Lat: {coordinates?.latitude}</p>
            <p>Long: {coordinates?.longitude} </p> */}
            </>
            }
            </div>

        </div>
        <GoogleMap />
        </>
    )
}

export default Homepage