import { useState } from "react";
import {
    AllUploadedImagesInterface,
    TripImageObject,
    TripObject
} from "../interfaces/SharedInterfaces";
import ImageUpload from "../components/ImageUpload";
import InteractiveMapWrapper from "../components/InteractiveMapWrapper";
import MapObjectContaienr from "../components/MapObjectContaienr";
import { initialPhotoState, initialState } from "../helperMethods";
import { MapPageContainer } from "../styles/StyledComponents";

const Homepage = () => {
    // const [imageMetaData, setImageMetaData] = useState<TripImageObject[]>([]);
    // const [imagesWithoutGPSMetaData, setImagesWithoutGPSMetaData] = useState<
    //     TripImageObject[]
    // >([]);
    const [tripObject, setTripObject] = useState<TripObject>(initialState);
    const [imageUploadComplete, setImageUploadComplete] =
        useState<boolean>(false);
    const [allUploadedImages, setAllUploadedImages] =
        useState<AllUploadedImagesInterface>(initialPhotoState);

    return (
        <>
            <MapPageContainer>
                {allUploadedImages.gpsImages!.length === 0 && (
                    <ImageUpload
                        setTripObject={setTripObject}
                        setImageUploadComplete={setImageUploadComplete}
                        allUploadedImages={allUploadedImages}
                        setAllUploadedImages={setAllUploadedImages}
                    />
                )}
                {imageUploadComplete && (
                    <MapObjectContaienr
                        tripObject={tripObject}
                        allUploadedImages={allUploadedImages}
                        setAllUploadedImages={setAllUploadedImages}
                    />
                )}
                <InteractiveMapWrapper
                    allUploadedImages={allUploadedImages}
                    setAllUploadedImages={setAllUploadedImages}
                    tripObject={tripObject}
                    setTripObject={setTripObject}
                />
            </MapPageContainer>
        </>
    );
};

export default Homepage;
