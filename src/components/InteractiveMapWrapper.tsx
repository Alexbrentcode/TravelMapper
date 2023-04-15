import { FC, useEffect, useState } from "react";
import GoogleMap from "./GoogleMap"
import { CoordianteInterface, InteractiveMapWrapperInterface } from "../interfaces/SharedInterfaces";
import UnsetImangeFooter from "./UnsetImangeFooter";

const InteractiveMapWrapper: FC<InteractiveMapWrapperInterface> = ({ imageMetaData, imagesWithoutGPSMetaData, setImageMetaData }) => {
    const initialState = {
        lat: 51.513974,
        lng: -0.030228
    }
    const [mapCentralPoint, setMapCentralPoint] = useState<CoordianteInterface>(initialState)
    const [userSetCoordinates, setUserSetCoordinates] = useState<CoordianteInterface>();
    const [inSetUserCoorindates, setInSetUserCoorindates] = useState<boolean>(false);
    const [currentUnsetImage, setCurrentUnsetImage] = useState<any>();

    const calculateMidPointOfAllCoordinates = (imageMetaData: any) => {
        //Assign totals...
        let [latitudeCount, longitudeCount] = [imageMetaData.length, imageMetaData.length]
        let [latitudeMean, longitudeMean] = [0, 0];

        imageMetaData.forEach((imageCoord: any) => {
            isNaN(imageCoord.latitude) ? latitudeCount-- : latitudeMean += imageCoord.latitude
            isNaN(imageCoord.longitude) ? longitudeCount-- : longitudeMean += imageCoord.longitude
        })

        //Return to 15th decimal as it's the max degree of accuracy recorded in coordiantes
        return { meanLat: Number((latitudeMean / latitudeCount).toFixed(15)), meanLng: Number((longitudeMean / longitudeCount).toFixed(15)) }
    }


    useEffect(() => {
        if (imageMetaData.length > 0) {
            let { meanLat, meanLng } = calculateMidPointOfAllCoordinates(imageMetaData);
            //console.log('Final calculated values are lat ' + meanLat + ' / lng ' + meanLng)

            //If numbers are valid, assign to centralPoint
            if (typeof meanLat === 'number' && typeof meanLng === 'number') {
                setMapCentralPoint({
                    lat: meanLat,
                    lng: meanLng
                })
            }
        }

    }, [imageMetaData])

    useEffect(() => {
        if (userSetCoordinates && currentUnsetImage) {
            setCurrentUnsetImage(false);
            console.log(userSetCoordinates)
            setImageMetaData((prevState: any) => [...prevState, {
                imageUrl: imagesWithoutGPSMetaData[currentUnsetImage].imageUrl, imageName: imagesWithoutGPSMetaData[currentUnsetImage].imageName,
                latitude: userSetCoordinates!.lat, longitude: userSetCoordinates!.lng,
                orientation: "", dateTime: ""
            }]);
        }
    }, [userSetCoordinates])

    return (
        <>
            <GoogleMap
                centralPosition={mapCentralPoint}
                allMetaData={imageMetaData}
                setUserSetCoordinates={setUserSetCoordinates}
            />
            <UnsetImangeFooter
                unsetImages={imagesWithoutGPSMetaData}
                setCurrentUnsetImage={setCurrentUnsetImage}
            />
        </>
    )
}

export default InteractiveMapWrapper