import { FC, useEffect, useState } from "react";
import GoogleMap from "./GoogleMap"
import { GoogleMapsCoordinates, InteractiveMapWrapperInterface } from "../interfaces/SharedInterfaces";

const InteractiveMapWrapper:FC<InteractiveMapWrapperInterface> = ({imageMetaData}) => {
    const initialState = {
        lat: 51.513974,
        lng: -0.030228
    }
    //Currently map central point will be first coordinate
    //Eventual goal, calculate midpoint of all coordinates passed and scale of zoom based on total distances
    const [mapCentralPoint, setMapCentralPoint] = useState<GoogleMapsCoordinates>(initialState)

    useEffect(() => {
        if(imageMetaData.length > 0){
            console.log(`Incoming lat ${imageMetaData[0].latitude}, ${imageMetaData[0].latitude}`)
            setMapCentralPoint({
                lat: Number(imageMetaData[0].latitude),
                lng: Number(imageMetaData[0].longitude)
            })
        }

    }, [imageMetaData])

    return (
        <>
          <GoogleMap 
           position={mapCentralPoint}
          />
        </>
    )
}

export default InteractiveMapWrapper