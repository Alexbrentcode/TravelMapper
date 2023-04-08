import { useEffect, useState } from "react";

import exifr from "exifr";
import GoogleMap from "../components/GoogleMap";

interface CoordinateInterface {
    latitude: number,
    longitude: number
}

const Homepage = () => {
    console.log(import.meta.env)
    const [uploadedImage, setUploadedImage] = useState<any>();
    const [imageURL, setImageUrl] = useState<any>();
    const [coordinates, setCoordinates] = useState<CoordinateInterface>();
    const processImage = async (image: any) => {
      const fileUrl = window.URL.createObjectURL(image.target.files![0]);
      setImageUrl(fileUrl);
      setUploadedImage(image);
      let {latitude, longitude} = await exifr.gps(fileUrl)
      setCoordinates({latitude: latitude, longitude: longitude})
      
    }

    useEffect(() => {
        console.log(`Coordinates are ${JSON.stringify(coordinates)}`)  
    })
  
    return (
        <>
        {/* <div style={{border: '1px solid black', width: 480, height: 480, flexDirection: 'inherit', display: 'flex', alignItems: 'inherit', justifyContent: 'inherit'}}>
          <h2>Upload your image</h2>
          <input type='file' name='imageTest' onChange={(e) => {processImage(e)}} />
          <img src={imageURL}style={{width: 240, height: 240, border: '1px solid black'}}/>
          <div>
            {coordinates &&
            <>
            <p>Lat: {coordinates?.latitude}</p>
            <p>Long: {coordinates?.longitude} </p>
            </>
            }
            </div>

        </div> */}
        <GoogleMap />
        </>
    )
}

export default Homepage