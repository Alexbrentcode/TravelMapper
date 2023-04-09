import { FC, useEffect, useState } from "react";
import GoogleMap from "./GoogleMap"
import { GoogleMapsCoordinates, InteractiveMapWrapperInterface } from "../interfaces/SharedInterfaces";

const InteractiveMapWrapper:FC<InteractiveMapWrapperInterface> = ({imageMetaData}) => {
    const initialState = {
        lat: 51.513974,
        lng: -0.030228
    }

    //Mean of 5 testImages form The Great Gable
    //MID LAT 54.4880875
    //MID LGN -3.210903472222222
    //metersPerPx = 156543.03392 * Math.cos(latLng.lat() * Math.PI / 180) / Math.pow(2, zoom)

    const [mapCentralPoint, setMapCentralPoint] = useState<GoogleMapsCoordinates>(initialState)


    const calculateMidPointOfAllCoordinates = (imageMetaData: any) => {
        //Assign totals...
        let [latitudeCount, longitudeCount] = [imageMetaData.length, imageMetaData.length]
        let [latitudeMean, longitudeMean] = [0,0];
    
        imageMetaData.forEach((imageCoord: any) => {
            isNaN(imageCoord.latitude) ? latitudeCount-- : latitudeMean += imageCoord.latitude
            isNaN(imageCoord.longitude) ? longitudeCount-- : longitudeMean += imageCoord.longitude
        })

        //Return to 15th decimal as it's the max degree of accuracy recorded in coordiantes
        return {meanLat: Number((latitudeMean/ latitudeCount).toFixed(15)), meanLng: Number((longitudeMean/ longitudeCount).toFixed(15))}
    }


    useEffect(() => {
        if(imageMetaData.length > 0){
            let {meanLat, meanLng} = calculateMidPointOfAllCoordinates(imageMetaData);
            console.log('Final calculated values are lat ' + meanLat + ' / lng ' + meanLng)

            //If numbers are valid, assign to centralPoint
            if(typeof meanLat === 'number' && typeof meanLng === 'number'){
                setMapCentralPoint({
                    lat: meanLat,
                    lng: meanLng
                })
            }
        }

    }, [imageMetaData])

    return (
        <>
          <GoogleMap 
           centralPosition={mapCentralPoint}
           allMetaData={imageMetaData}
          />
        </>
    )
}

export default InteractiveMapWrapper