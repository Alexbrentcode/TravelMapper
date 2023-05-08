import * as dayjs from "dayjs";
import {
    AllUploadedImagesInterface,
    TripImageObject,
    TripObject
} from "./interfaces/SharedInterfaces";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageListObject from "./components/Route/ImageListObject";
import { useEffect, useState } from "react";
dayjs().format();

export const formatDateDDMMYYYYHHMM = (date: Date) => {
    const formattedDate = date.toISOString();
    return dayjs(formattedDate.toLocaleString()).format("DD/MM/YYYY HH:mm");
};

export const getDateBySecondsSinceEpoch = (date: Date) => {
    return date.getTime();
};

// export const removeItemFromState = (setState: any, state: any, key: string) => {
//     //Lookup current state to find item to remove
//     const index = state.findIndex((item: any) => item.imageName === key);
//     setState([...state.slice(0, index), ...state.slice(index + 1)]);
// };

export const calculateMidPointOfAllCoordinates = (imageMetaData: any) => {
    //Assign totals...
    let [latitudeCount, longitudeCount] = [
        imageMetaData.length,
        imageMetaData.length
    ];
    let [latitudeMean, longitudeMean] = [0, 0];

    imageMetaData.forEach((imageCoord: any) => {
        console.log(imageCoord);
        isNaN(imageCoord.lat)
            ? latitudeCount--
            : (latitudeMean += imageCoord.lat);
        isNaN(imageCoord.lng)
            ? longitudeCount--
            : (longitudeMean += imageCoord.lng);
    });

    //Return to 15th decimal as it's the max degree of accuracy recorded in coordiantes
    return {
        meanLat: Number((latitudeMean / latitudeCount).toFixed(15)),
        meanLng: Number((longitudeMean / longitudeCount).toFixed(15))
    };
};

export const initialState: TripObject = {
    tripStartObj: {
        locationName: "",
        locationAddress: "",
        lat: "",
        lng: ""
    },
    tripEndObj: {
        locationName: "",
        locationAddress: "",
        lat: "",
        lng: ""
    },
    tripImages: []
};
export const initialPhotoState: AllUploadedImagesInterface = {
    gpsImages: [],
    noGpsImages: []
};

export const dragAndDropComponent = (
    allUploadedImages: AllUploadedImagesInterface,
    setAllUploadedImages: (value: any) => void,
    setSelectedUnsetItem: (value: any) => void,
    selectedUnsetItem: TripImageObject | null
) => {
    const setDroppableId = "set-images-dnd";
    const unsetDroppableId = "unset-images-dnd";
    const setItems = allUploadedImages.gpsImages!.map(
        (item: any, index: number) => (
            <Draggable
                key={item.imageId}
                index={index}
                draggableId={item.imageId}
                // isDragDisabled={index === 0}
            >
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <ImageListObject
                            item={item}
                            index={index}
                            setSelectedUnsetItem={setSelectedUnsetItem}
                            selectedUnsetItem={selectedUnsetItem}
                            listParent={setDroppableId}
                        />
                    </div>
                )}
            </Draggable>
        )
    );

    const unsetItems = allUploadedImages.noGpsImages!.map(
        (item: any, index: number) => (
            <Draggable
                key={item.imageId}
                index={index}
                draggableId={item.imageId}
                // isDragDisabled={index === 0}
            >
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <ImageListObject
                            item={item}
                            setSelectedUnsetItem={setSelectedUnsetItem}
                            selectedUnsetItem={selectedUnsetItem}
                            listParent={unsetDroppableId}
                        />
                    </div>
                )}
            </Draggable>
        )
    );

    const handleDragAndDrop = (destination: any, source: any) => {
        if (!destination.droppableId) {
            return;
        }
        if (
            source.droppableId === setDroppableId &&
            destination.droppableId === setDroppableId
        ) {
            const copiedSetImages = [...allUploadedImages.gpsImages!];
            const [removedSetImage] = copiedSetImages.splice(source.index, 1);
            copiedSetImages.splice(destination.index, 0, removedSetImage);
            setAllUploadedImages((prevState: any) => ({
                ...prevState,
                gpsImages: copiedSetImages
            }));
        } else if (
            source.droppableId === unsetDroppableId &&
            destination.droppableId === setDroppableId
        ) {
            const copiedUnsetImages = [...allUploadedImages.noGpsImages!];
            const copiedSetImages = [...allUploadedImages.gpsImages!];
            console.log(copiedUnsetImages);
            const [removedUnsetImage] = copiedUnsetImages.splice(
                source.index,
                1
            );
            copiedSetImages.splice(destination.index, 0, removedUnsetImage);
            setAllUploadedImages((prevState: any) => ({
                ...prevState,
                gpsImages: copiedSetImages,
                noGpsImages: copiedUnsetImages
            }));
        }
    };

    useEffect(() => {
        console.log(allUploadedImages);
    }, [allUploadedImages]);

    return (
        <>
            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    handleDragAndDrop(destination, source)
                }
            >
                <div
                    style={{
                        position: "relative",
                        height: "auto",
                        overflowY: "scroll"
                    }}
                >
                    <Droppable
                        droppableId={setDroppableId}
                        direction="vertical"
                    >
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {setItems}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                {allUploadedImages.noGpsImages!.length > 0 && (
                    <>
                        <h4>Unset Images</h4>
                        <div
                            style={{
                                position: "relative",
                                height: "max-content",
                                overflowY: "scroll"
                            }}
                        >
                            <Droppable
                                droppableId={unsetDroppableId}
                                direction="vertical"
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {unsetItems}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </>
                )}
            </DragDropContext>
        </>
    );
};
