import { useState } from "react";
import { TripImageObject, TripObject } from "../interfaces/SharedInterfaces"
import ImageUpload from "../components/ImageUpload";
import InteractiveMapWrapper from "../components/InteractiveMapWrapper";
import MapObjectContaienr from "../components/MapObjectContaienr";
import { initialState } from "../helperMethods";

const Homepage = () => {
    const [imageMetaData, setImageMetaData] = useState<TripImageObject[]>([]);
    const [imagesWithoutGPSMetaData, setImagesWithoutGPSMetaData] = useState<any[]>([]);
    const [tripObject, setTripObject] = useState<TripObject>(initialState);

    return (
        <>
            <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'end' }}>
                {imageMetaData.length === 0 && (
                    <ImageUpload
                        setImageMetaData={setImageMetaData}
                        setImagesWithoutGPSMetaData={setImagesWithoutGPSMetaData}
                        setTripObject={setTripObject}
                    />
                )}
                {tripObject?.tripImages?.length && (
                    <MapObjectContaienr
                        tripObject={tripObject}
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
            </div >
        </>
    )
}

export default Homepage