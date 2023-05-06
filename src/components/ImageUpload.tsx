import { FC, useEffect, useState } from "react";
import exifr from "exifr";
import {
    ImageUploadInterface,
    LocationDataObject,
    TripObject
} from "../interfaces/SharedInterfaces";
import { getGeoCodeByString } from "../api/Geocode/GeocodeApi";
import { getDateBySecondsSinceEpoch, initialState } from "../helperMethods";
import {
    SearchButtonCustom,
    SidePanelCustom,
    TextFieldCustom
} from "../styles/StyledComponents";
import styled from "@emotion/styled";

const ImageUpload: FC<ImageUploadInterface> = ({
    setImageMetaData,
    setImagesWithoutGPSMetaData,
    setTripObject,
    setImageUploadComplete
}) => {
    const [locationData, setLocationData] = useState<TripObject>(initialState);
    const [locationQueryResponse, setLocationQueryResponse] =
        useState<TripObject>();
    // Reset current state to avoid duplicating items in state
    const resetUploadedImageState = () => {
        setImageMetaData([]);
    };

    useEffect(() => {
        console.log(locationQueryResponse);
    }, [locationQueryResponse]);

    const fetchStartLocationData = async () => {
        const res = await getGeoCodeByString(
            locationData?.tripStartObj.locationName
        );
        setLocationQueryResponse((prevState: any) => ({
            ...prevState,
            tripStartObj: {
                locationName: locationData.tripStartObj.locationName,
                locationAddress: res[0].display_name,
                lat: res[0].lat,
                lng: res[0].lon
            }
        }));

        //TODO - Put behind user confirmation that inforamtion is as expected
        setTripObject((prevState: any) => ({
            ...prevState,
            tripStartObj: {
                locationName: locationData.tripStartObj.locationName,
                locationAddress: res[0].display_name,
                lat: res[0].lat,
                lng: res[0].lon
            }
        }));
    };

    const fetchEndLocationData = async () => {
        const res = await getGeoCodeByString(
            locationData?.tripEndObj.locationName
        );
        setLocationQueryResponse((prevState: any) => ({
            ...prevState,
            tripEndObj: {
                locationName: locationData.tripEndObj.locationName,
                locationAddress: res[0].display_name,
                lat: res[0].lat,
                lng: res[0].lon
            }
        }));

        //TODO - Put behind user confirmation that inforamtion is as expected
        setTripObject((prevState: any) => ({
            ...prevState,
            tripEndObj: {
                locationName: locationData.tripEndObj.locationName,
                locationAddress: res[0].display_name,
                lat: res[0].lat,
                lng: res[0].lon
            }
        }));
    };

    const processImage = async (image: any) => {
        resetUploadedImageState();
        const imageFileArray = Array.from(image.target.files);

        for (let i = 0; i < imageFileArray.length; i++) {
            const thisImage: any = imageFileArray[i];
            const fileUrl = window.URL.createObjectURL(thisImage);
            if (await exifr.gps(fileUrl)) {
                let { latitude, longitude } = await exifr.gps(fileUrl);
                let testAllData = await exifr.parse(fileUrl);
                setImageMetaData((prevState: any) => [
                    ...prevState,
                    {
                        imageUrl: fileUrl,
                        imageName: thisImage.name,
                        lat: latitude,
                        lng: longitude,
                        orientation: testAllData.Orientation,
                        dateTime: testAllData.DateTimeOriginal,
                        dateTimeSeconds: getDateBySecondsSinceEpoch(
                            new Date(testAllData.DateTimeOriginal)
                        ),
                        imageId: crypto.randomUUID()
                    }
                ]);
            } else {
                setImagesWithoutGPSMetaData((prevState: any) => [
                    ...prevState,
                    {
                        imageUrl: fileUrl,
                        imageName: thisImage.name,
                        dateTime: new Date(0),
                        imageId: crypto.randomUUID(),
                        lat: null,
                        lng: null
                    }
                ]);
            }
        }
        setImageUploadComplete(true);
    };
    return (
        <>
            <SidePanelCustom>
                <h1>Lets get started!</h1>
                <div style={{ border: "1px solid black" }}>
                    <h2>Where did your trip begin?</h2>

                    <div style={{ display: "flex", width: "max-content" }}>
                        <TextFieldCustom
                            id="standard-basic"
                            placeholder="Enter a location"
                            onChange={(e: any) =>
                                setLocationData((prevState: any) => ({
                                    ...prevState,
                                    tripStartObj: {
                                        locationName: e.target.value
                                    }
                                }))
                            }
                        />
                        <SearchButtonCustom onClick={fetchStartLocationData} />
                    </div>
                    {locationQueryResponse &&
                        locationQueryResponse.tripStartObj.locationAddress
                            .length > 0 && (
                            <p>
                                {
                                    locationQueryResponse.tripStartObj
                                        .locationAddress
                                }
                            </p>
                        )}
                    <h2>Where did your trip end?</h2>
                    <br />
                    <div style={{ display: "flex", width: "mxa-content" }}>
                        <TextFieldCustom
                            id="standard-basic"
                            placeholder="Enter a location"
                            onChange={(e: any) =>
                                setLocationData((prevState: any) => ({
                                    ...prevState,
                                    tripEndObj: { locationName: e.target.value }
                                }))
                            }
                        />
                        <SearchButtonCustom onClick={fetchEndLocationData} />
                    </div>
                    <input
                        type="file"
                        name="imageTest"
                        multiple={true}
                        onChange={(e) => {
                            processImage(e);
                        }}
                    />
                </div>
            </SidePanelCustom>
        </>
    );
};

export default ImageUpload;
