import { FC, useEffect, useState } from "react";
import {
    CoordianteInterface,
    GoogleMapInterface,
    TripImageObject
} from "../../interfaces/SharedInterfaces";
import { getGeoCodeByCoordinates } from "../../api/Geocode/GeocodeApi";

import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import ModalOverlay from "../Modal/ModalOverlay";

const InteractiveGoogleMap: FC<GoogleMapInterface> = ({
    centralPosition,
    allUploadedImages,
    selectedUnsetItem,
    setAllUploadedImages,
    setSelectedUnsetItem
}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<TripImageObject>();
    const [currentLocation, setCurrentLocation] = useState<any>("");
    const [selectedCoorindates, setSelectedCoordinates] =
        useState<CoordianteInterface>();

    const handleModalClose = (e: any) => {
        if (modalOpen) {
            setModalOpen(false);
        }
    };

    const handleCancelSetImage = () => {
        setModalOpen(false);
    };

    async function initMap(map: any): Promise<void> {
        //@ts-ignore
        const { Map } = (await google.maps.importLibrary(
            "maps"
        )) as google.maps.MapsLibrary;
        let processedCoordinatesForLineDrawing: any = [];

        //Iterate through iamges and set as markers
        allUploadedImages.gpsImages!.forEach((uploadedImage: any) => {
            //Interacting with image markers
            // customImageMarker.addListener("click", (e: any) => {
            //     const clickedImageName = e.domEvent.target.parentElement.title;
            //     allUploadedImages.gpsImages!.filter((el) => {
            //         if (el.imageName === clickedImageName) {
            //             setCurrentImage(el);
            //             setModalOpen(true);
            //         }
            //     });
            // });
        });

        //Handler for getting coordiantes from map
        // map.addListener("click", (mapsMouseEvent: any) => {
        //     setUserSetCoordinates({
        //         lat: mapsMouseEvent.latLng.toJSON().lat,
        //         lng: mapsMouseEvent.latLng.toJSON().lng
        //     });
        // });

        //Current placeholder for linking each marker together
        // const placeholderPolyline = new google.maps.Polyline({
        //     map: map,
        //     path: processedCoordinatesForLineDrawing,
        //     visible: true,
        //     zIndex: 6,
        //     strokeColor: "black"
        // });
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

    const setUnsetImageCoordinates = () => {
        const copiedState = [...allUploadedImages.gpsImages!];

        const updatedImage = {
            ...selectedUnsetItem!,
            lat: selectedCoorindates?.lat,
            lng: selectedCoorindates?.lng,
            isSet: true
        };

        const imageIdToUpdate = selectedUnsetItem?.imageId;
        const indexToUpdate = copiedState.findIndex(
            (item) => item.imageId == imageIdToUpdate
        );
        copiedState.splice(indexToUpdate, 1, updatedImage);

        setAllUploadedImages((prevState: any) => ({
            prevState,
            gpsImages: copiedState,
            noGpsImages: prevState.noGpsImages
        }));
        setSelectedUnsetItem(null);
        setModalOpen(false);
    };

    const openConfirmationModal = (lat: number, lng: number) => {
        if (selectedUnsetItem !== null) {
            setSelectedCoordinates({ lat: lat, lng: lng });
            setModalOpen(true);
        }
    };

    return (
        <>
            {modalOpen && (
                <ModalOverlay
                    title={"Confirmation"}
                    actionPrompt={`Do you want to set ${
                        selectedUnsetItem?.imageName
                    } at location ${selectedCoorindates!.lat}, ${
                        selectedCoorindates!.lng
                    }?`}
                    onAction={setUnsetImageCoordinates}
                    onCancel={handleCancelSetImage}
                />
            )}
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: `${import.meta.env.VITE_APP_MAPS_API_KEY}`
                    }}
                    defaultCenter={centralPosition}
                    center={centralPosition}
                    defaultZoom={13}
                    onClick={({ x, y, lat, lng, event }) => {
                        openConfirmationModal(lat, lng);
                    }}
                >
                    {allUploadedImages.gpsImages?.map(
                        (image: any, index: number) => {
                            return (
                                <Marker
                                    lat={image.lat}
                                    lng={image.lng}
                                    imageName={image.imageName}
                                    index={index}
                                />
                            );
                        }
                    )}
                </GoogleMapReact>
            </div>

            {/* {modalOpen && (
                    // <div
                    //     onClick={(e) => handleModalClose(e)}
                    //     style={{
                    //         position: "absolute",
                    //         width: "100%",
                    //         height: "100%"
                    //     }}
                    // >
                    //     <div
                    //         onClick={(e) => e.stopPropagation()}
                    //         style={{
                    //             padding: 30,
                    //             width: "max-content",
                    //             height: 600,
                    //             position: "absolute",
                    //             zIndex: 10,
                    //             border: "1px solid black",
                    //             backgroundColor: "#fefefefe",
                    //             left: 0,
                    //             right: 0,
                    //             top: 0,
                    //             bottom: 0,
                    //             marginLeft: "auto",
                    //             marginRight: "auto",
                    //             marginTop: "auto",
                    //             marginBottom: "auto"
                    //         }}
                    //     >
                    //         {currentImage && (
                    //             <>
                    //                 <img
                    //                     src={currentImage?.imageUrl}
                    //                     style={{ height: "80%" }}
                    //                 />
                    //                 <p>Title: {currentImage?.imageName}</p>
                    //                 <p>
                    //                     Date Taken:{" "}
                    //                     {currentImage.dateTime &&
                    //                         formatDateDDMMYYYYHHMM(
                    //                             currentImage.dateTime
                    //                         )}
                    //                 </p>
                    //                 <p
                    //                     style={{
                    //                         width: "600px",
                    //                         wordWrap: "normal"
                    //                     }}
                    //                 >
                    //                     Location {currentLocation}
                    //                 </p>
                    //             </>
                    //         )}
                    //     </div>
                    // </div>
                )} */}
        </>
    );
};

export default InteractiveGoogleMap;
