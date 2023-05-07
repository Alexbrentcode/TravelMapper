import { FC, useEffect, useState } from "react";
import {
    GoogleMapInterface,
    TripImageObject
} from "../interfaces/SharedInterfaces";
import ImageUpload from "./ImageUpload";
import {
    getGeoCodeByCoordinates,
    getGeoCodeByString
} from "../api/Geocode/GeocodeApi";
import {
    formatDateDDMMYYYYHHMM,
    getDateBySecondsSinceEpoch
} from "../helperMethods";
import GoogleMapReact from "google-map-react";

const GoogleMap: FC<GoogleMapInterface> = ({
    centralPosition,
    allUploadedImages,
    setUserSetCoordinates
}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<TripImageObject>();
    const [currentLocation, setCurrentLocation] = useState<any>("");
    let map: any;
    const handleModalClose = (e: any) => {
        if (modalOpen) {
            setModalOpen(false);
        }
    };

    async function initMap(map: any): Promise<void> {
        //@ts-ignore
        const { Map } = (await google.maps.importLibrary(
            "maps"
        )) as google.maps.MapsLibrary;
        //const { AdvancedMarkerView } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        let processedCoordinatesForLineDrawing: any = [];
        map = new Map(document.getElementById("map") as HTMLElement, {
            zoom: 14,
            center: centralPosition,
            mapId: "31e4449696ca43c4"
        });

        //Iterate through iamges and set as markers
        allUploadedImages.gpsImages!.forEach((uploadedImage: any) => {
            var icon = {
                url: uploadedImage.imageUrl,
                scaledSize: new google.maps.Size(75, 75)
            };
            processedCoordinatesForLineDrawing.push(
                new google.maps.LatLng(uploadedImage.lat, uploadedImage.lng)
            );

            const customImageMarker = new google.maps.Marker({
                map: map,
                position: { lat: uploadedImage.lat, lng: uploadedImage.lng },
                title: uploadedImage.imageName,
                icon: icon
            });

            //Interacting with image markers
            customImageMarker.addListener("click", (e: any) => {
                const clickedImageName = e.domEvent.target.parentElement.title;
                allUploadedImages.gpsImages!.filter((el) => {
                    if (el.imageName === clickedImageName) {
                        setCurrentImage(el);
                        setModalOpen(true);
                    }
                });
            });
        });

        //Handler for getting coordiantes from map
        map.addListener("click", (mapsMouseEvent: any) => {
            setUserSetCoordinates({
                lat: mapsMouseEvent.latLng.toJSON().lat,
                lng: mapsMouseEvent.latLng.toJSON().lng
            });
        });

        //Current placeholder for linking each marker together
        const placeholderPolyline = new google.maps.Polyline({
            map: map,
            path: processedCoordinatesForLineDrawing,
            visible: true,
            zIndex: 6,
            strokeColor: "black"
        });
    }

    const fetchLocationDisplayName = async () => {
        const res = await getGeoCodeByCoordinates(
            currentImage!.lat,
            currentImage!.lng
        );
        setCurrentLocation(res.display_name);
    };

    useEffect(() => {
        if (currentImage) {
            fetchLocationDisplayName();
        }
    }, [currentImage]);

    const loadMap = () => {
        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: `${import.meta.env.VITE_APP_MAPS_API_KEY}`
                    }}
                    defaultCenter={centralPosition}
                    defaultZoom={13}
                ></GoogleMapReact>
            </div>
        );
    };
    return (
        <>
            {/* <div id="map"></div> */}
            {loadMap()}
            {modalOpen && (
                <div
                    onClick={(e) => handleModalClose(e)}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            padding: 30,
                            width: "max-content",
                            height: 600,
                            position: "absolute",
                            zIndex: 10,
                            border: "1px solid black",
                            backgroundColor: "#fefefefe",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "auto",
                            marginBottom: "auto"
                        }}
                    >
                        {currentImage && (
                            <>
                                <img
                                    src={currentImage?.imageUrl}
                                    style={{ height: "80%" }}
                                />
                                <p>Title: {currentImage?.imageName}</p>
                                <p>
                                    Date Taken:{" "}
                                    {currentImage.dateTime &&
                                        formatDateDDMMYYYYHHMM(
                                            currentImage.dateTime
                                        )}
                                </p>
                                <p
                                    style={{
                                        width: "600px",
                                        wordWrap: "normal"
                                    }}
                                >
                                    Location {currentLocation}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default GoogleMap;
