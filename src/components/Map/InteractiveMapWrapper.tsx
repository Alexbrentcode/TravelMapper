import { FC, useEffect, useState } from "react";
import {
    CoordianteInterface,
    InteractiveMapWrapperInterface
} from "../../interfaces/SharedInterfaces";
import { calculateMidPointOfAllCoordinates } from "../../helperMethods";
import InteractiveGoogleMap from "./InteractiveGoogleMap";

const InteractiveMapWrapper: FC<InteractiveMapWrapperInterface> = ({
    tripObject,
    setTripObject,
    allUploadedImages,
    setAllUploadedImages,
    selectedUnsetItem,
    setSelectedUnsetItem
}) => {
    const initialState = {
        lat: 51.513974,
        lng: -0.030228
    };
    const [mapCentralPoint, setMapCentralPoint] =
        useState<CoordianteInterface>(initialState);

    useEffect(() => {
        console.log(`In gps sorting`);
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

    // SORTING FUNCTION
    //useEffect(() => {
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

    return (
        <>
            <InteractiveGoogleMap
                centralPosition={mapCentralPoint}
                allUploadedImages={allUploadedImages}
                selectedUnsetItem={selectedUnsetItem}
                setSelectedUnsetItem={setSelectedUnsetItem}
                setAllUploadedImages={setAllUploadedImages}
            />
        </>
    );
};

export default InteractiveMapWrapper;
