import { useEffect, useState } from "react";
import { MetaDataInterface, TripLocationInterface } from "../interfaces/SharedInterfaces"
import ImageUpload from "../components/ImageUpload";
import InteractiveMapWrapper from "../components/InteractiveMapWrapper";
import { getGeoCodeByString } from "../api/Geocode/GeocodeApi";

const Homepage = () => {
    const [imageMetaData, setImageMetaData] = useState<MetaDataInterface[]>([]);
    const [imagesWithoutGPSMetaData, setImagesWithoutGPSMetaData] = useState<any[]>([]);
    const [tripLocations, setTripLocations] = useState<TripLocationInterface>()

    return (
        <>
            <div style={{ height: '100%', width: '100%', display: 'flex' }}>
                {imageMetaData.length === 0 && (
                    <ImageUpload
                        setImageMetaData={setImageMetaData}
                        setImagesWithoutGPSMetaData={setImagesWithoutGPSMetaData}
                        setTripLocations={setTripLocations}
                    />
                )}
                <InteractiveMapWrapper
                    imageMetaData={imageMetaData}
                    setImageMetaData={setImageMetaData}
                    imagesWithoutGPSMetaData={imagesWithoutGPSMetaData}
                />
            </div >
        </>
    )
}

export default Homepage