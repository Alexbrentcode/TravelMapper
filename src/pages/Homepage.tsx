import { useState } from "react";
import {
    AllUploadedImagesInterface,
    TripImageObject,
    TripObject
} from "../interfaces/SharedInterfaces";
import ImageUpload from "../components/ImageUpload";
import InteractiveMapWrapper from "../components/Map/InteractiveMapWrapper";
import RouteContainer from "../components/Route/RouteContainer";
import { initialPhotoState, initialState } from "../helperMethods";
import { MapPageContainer } from "../styles/StyledComponents";

const Homepage = () => {
    const [tripObject, setTripObject] = useState<TripObject>(initialState);
    const [imageUploadComplete, setImageUploadComplete] =
        useState<boolean>(false);
    const [allUploadedImages, setAllUploadedImages] =
        useState<AllUploadedImagesInterface>(initialPhotoState);
    const [selectedUnsetItem, setSelectedUnsetItem] =
        useState<TripImageObject | null>(null);
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
                    <RouteContainer
                        tripObject={tripObject}
                        allUploadedImages={allUploadedImages}
                        setAllUploadedImages={setAllUploadedImages}
                        setSelectedUnsetItem={setSelectedUnsetItem}
                        selectedUnsetItem={selectedUnsetItem}
                    />
                )}
                <InteractiveMapWrapper
                    allUploadedImages={allUploadedImages}
                    setAllUploadedImages={setAllUploadedImages}
                    tripObject={tripObject}
                    setTripObject={setTripObject}
                    selectedUnsetItem={selectedUnsetItem}
                    setSelectedUnsetItem={setSelectedUnsetItem}
                />
            </MapPageContainer>
        </>
    );
};

export default Homepage;
