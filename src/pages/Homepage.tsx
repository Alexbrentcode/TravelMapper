import { useState } from "react";
import { TripImageObject, TripObject } from "../interfaces/SharedInterfaces"
import ImageUpload from "../components/ImageUpload";
import InteractiveMapWrapper from "../components/InteractiveMapWrapper";
import MapObjectContaienr from "../components/MapObjectContaienr";
import { initialState } from "../helperMethods";
import { MapPageContainer } from "../styles/StyledComponents";

const Homepage = () => {
    const [imageMetaData, setImageMetaData] = useState<TripImageObject[]>([]);
    const [imagesWithoutGPSMetaData, setImagesWithoutGPSMetaData] = useState<any[]>([]);
    const [tripObject, setTripObject] = useState<TripObject>(initialState);

    return (
        <>
            <MapPageContainer>
                {imageMetaData.length === 0 && (
                    <ImageUpload
                        setImageMetaData={setImageMetaData}
                        setImagesWithoutGPSMetaData={setImagesWithoutGPSMetaData}
                        setTripObject={setTripObject}
                    />
                )}
                {imageMetaData.length > 0 && (
                    <MapObjectContaienr
                        tripObject={tripObject}
                        setImageMetaData={setImageMetaData}
                        imageMetaData={imageMetaData}
                    />
                )}
                <InteractiveMapWrapper
                    imageMetaData={imageMetaData}
                    setImageMetaData={setImageMetaData}
                    imagesWithoutGPSMetaData={imagesWithoutGPSMetaData}
                    setImagesWithoutGPSMetaData={setImagesWithoutGPSMetaData}
                    tripObject={tripObject}
                    setTripObject={setTripObject}

                />
            </MapPageContainer >
        </>
    )
}

export default Homepage