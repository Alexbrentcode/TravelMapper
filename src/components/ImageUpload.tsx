import { FC, useEffect, useState } from "react"
import exifr from "exifr";
import { ImageUploadInterface, LocationDataObject, TripObject } from "../interfaces/SharedInterfaces";
import { getGeoCodeByString } from "../api/Geocode/GeocodeApi";
import { getDateBySecondsSinceEpoch, initialState } from "../helperMethods";

const ImageUpload: FC<ImageUploadInterface> = ({ setImageMetaData, setImagesWithoutGPSMetaData, setTripObject }) => {
    const [locationData, setLocationData] = useState<TripObject>(initialState);
    const [locationQueryResponse, setLocationQueryResponse] = useState<TripObject>();
    // Reset current state to avoid duplicating items in state
    const resetUploadedImageState = () => {
        setImageMetaData([])
    }

    useEffect(() => {
        console.log(locationQueryResponse)
    }, [locationQueryResponse])

    const fetchStartLocationData = async () => {
        const res = await getGeoCodeByString(locationData?.tripStartObj.locationName);
        setLocationQueryResponse((prevState: any) => ({
            ...prevState, tripStartObj:
                ({ locationName: locationData.tripStartObj.locationName, locationAddress: res[0].display_name, lat: res[0].lat, lng: res[0].lon })
        }))

        //TODO - Put behind user confirmation that inforamtion is as expected
        setTripObject((prevState: any) => ({
            ...prevState, tripStartObj:
                ({ locationName: locationData.tripStartObj.locationName, locationAddress: res[0].display_name, lat: res[0].lat, lng: res[0].lon })
        }));
    }

    const fetchEndLocationData = async () => {
        const res = await getGeoCodeByString(locationData?.tripEndObj.locationName);
        setLocationQueryResponse((prevState: any) => ({
            ...prevState, tripEndObj:
                ({ locationName: locationData.tripEndObj.locationName, locationAddress: res[0].display_name, lat: res[0].lat, lng: res[0].lon })
        }))

        //TODO - Put behind user confirmation that inforamtion is as expected
        setTripObject((prevState: any) => ({
            ...prevState, tripEndObj:
                ({ locationName: locationData.tripEndObj.locationName, locationAddress: res[0].display_name, lat: res[0].lat, lng: res[0].lon })
        }));
    }

    const processImage = async (image: any) => {
        resetUploadedImageState();
        const imageFileArray = Array.from(image.target.files)

        for (let i = 0; i < imageFileArray.length; i++) {
            const thisImage: any = imageFileArray[i];
            const fileUrl = window.URL.createObjectURL(thisImage);
            if (await exifr.gps(fileUrl)) {
                let { latitude, longitude } = await exifr.gps(fileUrl)
                let testAllData = await exifr.parse(fileUrl);
                setImageMetaData((prevState: any) => [...prevState, {
                    imageUrl: fileUrl, imageName: thisImage.name, lat: latitude, lng: longitude,
                    orientation: testAllData.Orientation, dateTime: testAllData.DateTimeOriginal,
                    dateTimeSeconds: getDateBySecondsSinceEpoch(new Date(testAllData.DateTimeOriginal))
                }]);
            } else {
                setImagesWithoutGPSMetaData((prevState: any) => [...prevState, { imageUrl: fileUrl, imageName: thisImage.name, imgObj: thisImage, dateTime: new Date(0) }])
            }
        }
    }
    return (
        <>
            <div style={{
                border: '1px solid red', width: 480, height: '100%', flexDirection: 'column', display: 'flex',
                alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 5, backgroundColor: 'white'
            }}>
                <h1>Travel Mapper</h1>
                <h2>Where did your trip begin?</h2>
                <br />
                <div
                    style={{ display: 'flex', width: 'mxa-content' }}
                >
                    <input type='text' placeholder="Enter a location" onChange={(e: any) => setLocationData((prevState: any) => ({ ...prevState, tripStartObj: ({ locationName: e.target.value }) }))} />
                    <button onClick={fetchStartLocationData}>Go</button>
                </div>
                {locationQueryResponse && locationQueryResponse.tripStartObj.locationAddress.length > 0 && (
                    <p>{locationQueryResponse.tripStartObj.locationAddress}</p>
                )}
                <h2>Where did your trip end?</h2>
                <br />
                <div
                    style={{ display: 'flex', width: 'mxa-content' }}
                >
                    <input type='text' placeholder="Enter a location" onChange={(e: any) => setLocationData((prevState: any) => ({ ...prevState, tripEndObj: ({ locationName: e.target.value }) }))} />
                    <button onClick={fetchEndLocationData}>Go</button>
                </div>
                <br />
                < input type='file' name='imageTest' multiple={true} onChange={(e) => { processImage(e) }} />
            </div >
        </>

    )


}

export default ImageUpload