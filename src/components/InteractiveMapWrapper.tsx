import { FC, useEffect, useState } from "react";
import GoogleMap from "./GoogleMap"
import { CoordianteInterface, InteractiveMapWrapperInterface } from "../interfaces/SharedInterfaces";
import UnsetImangeFooter from "./UnsetImangeFooter";

const InteractiveMapWrapper: FC<InteractiveMapWrapperInterface> = ({ imageMetaData, imagesWithoutGPSMetaData, setImageMetaData, setImagesWithoutGPSMetaData }) => {
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
            //If numbers are valid, assign to centralPoint
            if (typeof meanLat === 'number' && typeof meanLng === 'number') {
                setMapCentralPoint({
                    lat: meanLat,
                    lng: meanLng
                })
            }
        }

    }, [imageMetaData])

    const removeItemFromState = (setState: any, state: any, key: string) => {
        console.log(`Key is ${key}`)

        const index = state.findIndex((item: any) => item.imageName === key)
        // console.log(`State before mutation ${JSON.stringify(state)}`)
        console.log(`Index ${index}`)
        setState([
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ]);

        console.log(`State after mutation ${JSON.stringify(state)}`)
    }

    useEffect(() => {
        if (userSetCoordinates && currentUnsetImage) {
            setCurrentUnsetImage(false);
            console.log(userSetCoordinates)
            setImageMetaData((prevState: any) => [...prevState, {
                imageUrl: imagesWithoutGPSMetaData[currentUnsetImage.imageIdx].imageUrl, imageName: imagesWithoutGPSMetaData[currentUnsetImage.imageIdx].imageName,
                latitude: userSetCoordinates!.lat, longitude: userSetCoordinates!.lng,
                orientation: "", dateTime: ""
            }]);
            //Remove that item from state
            removeItemFromState(setImagesWithoutGPSMetaData, imagesWithoutGPSMetaData, currentUnsetImage.imageName)

        }
    }, [userSetCoordinates])

    return (
        <>
            <GoogleMap
                centralPosition={mapCentralPoint}
                allMetaData={imageMetaData}
                setUserSetCoordinates={setUserSetCoordinates}
            />
            {imagesWithoutGPSMetaData.length > 0 && (
                <UnsetImangeFooter
                    unsetImages={imagesWithoutGPSMetaData}
                    setCurrentUnsetImage={setCurrentUnsetImage}
                />
            )}
        </>
    )
}

export default InteractiveMapWrapper