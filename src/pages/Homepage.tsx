import { useEffect, useState } from "react";
import { TripImageObject } from "../interfaces/SharedInterfaces"
import ImageUpload from "../components/ImageUpload";
import InteractiveMapWrapper from "../components/InteractiveMapWrapper";
import { getGeoCodeByString } from "../api/Geocode/GeocodeApi";

const Homepage = () => {
    const [imageMetaData, setImageMetaData] = useState<TripImageObject[]>([]);
    const [imagesWithoutGPSMetaData, setImagesWithoutGPSMetaData] = useState<any[]>([]);

    return (
        <>
            <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'end' }}>
                {imageMetaData.length === 0 && (
                    <ImageUpload
                        setImageMetaData={setImageMetaData}
                        setImagesWithoutGPSMetaData={setImagesWithoutGPSMetaData}
                    />
                )}
                <InteractiveMapWrapper
                    imageMetaData={imageMetaData}
                    setImageMetaData={setImageMetaData}
                    imagesWithoutGPSMetaData={imagesWithoutGPSMetaData}
                    setImagesWithoutGPSMetaData={setImagesWithoutGPSMetaData}
                />
            </div >
        </>
    )
}

export default Homepage