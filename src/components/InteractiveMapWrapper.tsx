import { FC, useEffect, useState } from "react";
import GoogleMap from "./GoogleMap";
import {
    CoordianteInterface,
    InteractiveMapWrapperInterface
} from "../interfaces/SharedInterfaces";
import UnsetImangeFooter from "./UnsetImangeFooter";
import {
    calculateMidPointOfAllCoordinates,
    removeItemFromState
} from "../helperMethods";

const InteractiveMapWrapper: FC<InteractiveMapWrapperInterface> = ({
    tripObject,
    setTripObject,
    allUploadedImages,
    setAllUploadedImages
}) => {
    const initialState = {
        lat: 51.513974,
        lng: -0.030228
    };
    const [mapCentralPoint, setMapCentralPoint] =
        useState<CoordianteInterface>(initialState);
    const [userSetCoordinates, setUserSetCoordinates] =
        useState<CoordianteInterface>();
    const [currentUnsetImage, setCurrentUnsetImage] = useState<any>();

    useEffect(() => {
        if (allUploadedImages.gpsImages!.length > 0) {
            let { meanLat, meanLng } = calculateMidPointOfAllCoordinates(
                allUploadedImages.gpsImages!
            );
            //If numbers are valid, assign to centralPoint
            if (typeof meanLat === "number" && typeof meanLng === "number") {
                setMapCentralPoint({
                    lat: meanLat,
                    lng: meanLng
                });
            }
        }
    }, [allUploadedImages.gpsImages!]);

    // useEffect(() => {
    //     if (allUploadedImages.gpsImages!.length > 0) {
    //         const sortedData = allUploadedImages.gpsImages!.sort(
    //             (a: any, b: any) => a.dateTimeSeconds - b.dateTimeSeconds
    //         );
    //         setTripObject((prevState: any) => ({
    //             ...prevState,
    //             tripImages: sortedData
    //         }));
    //     }
    // }, [allUploadedImages.gpsImages!]);

    // useEffect(() => {
    //     if (userSetCoordinates && currentUnsetImage) {
    //         setCurrentUnsetImage(false);
    //         console.log(userSetCoordinates);
    //         setImageMetaData((prevState: any) => [
    //             ...prevState,
    //             {
    //                 imageUrl:
    //                     imagesWithoutGPSMetaData[currentUnsetImage.imageIdx]
    //                         .imageUrl,
    //                 imageName:
    //                     imagesWithoutGPSMetaData[currentUnsetImage.imageIdx]
    //                         .imageName,
    //                 lat: userSetCoordinates!.lat,
    //                 lng: userSetCoordinates!.lng,
    //                 orientation: "",
    //                 dateTime: ""
    //             }
    //         ]);
    //         //Remove that item from state
    //         removeItemFromState(
    //             setImagesWithoutGPSMetaData,
    //             imagesWithoutGPSMetaData,
    //             currentUnsetImage.imageName
    //         );
    //     }
    // }, [userSetCoordinates]);

    return (
        <>
            <GoogleMap
                centralPosition={mapCentralPoint}
                allUploadedImages={allUploadedImages}
                setUserSetCoordinates={setUserSetCoordinates}
            />
        </>
    );
};

export default InteractiveMapWrapper;
