import * as dayjs from "dayjs";
import { TripImageObject, TripObject } from "./interfaces/SharedInterfaces";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageListObject from "./components/ImageListObject";
dayjs().format();

export const formatDateDDMMYYYYHHMM = (date: Date) => {
    const formattedDate = date.toISOString();
    return dayjs(formattedDate.toLocaleString()).format("DD/MM/YYYY HH:mm");
};

export const getDateBySecondsSinceEpoch = (date: Date) => {
    return date.getTime();
};

export const removeItemFromState = (setState: any, state: any, key: string) => {
    //Lookup current state to find item to remove
    const index = state.findIndex((item: any) => item.imageName === key);
    setState([...state.slice(0, index), ...state.slice(index + 1)]);
};

export const calculateMidPointOfAllCoordinates = (imageMetaData: any) => {
    //Assign totals...
    let [latitudeCount, longitudeCount] = [
        imageMetaData.length,
        imageMetaData.length
    ];
    let [latitudeMean, longitudeMean] = [0, 0];

    imageMetaData.forEach((imageCoord: any) => {
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

export const dragAndDropComponent = (data: TripImageObject[]) => {
    //const { classes, cx } = useStyles();
    const [state, handlers] = useListState(data);
    const items = state.map((item: any, index: number) => (
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
                    <ImageListObject item={item} />
                </div>
            )}
        </Draggable>
    ));

    return (
        <DragDropContext
            onDragEnd={
                ({ destination, source }) =>
                    console.log(
                        `Destination ${JSON.stringify(
                            destination
                        )} source ${JSON.stringify(source)}`
                    )

                // handlers.reorder({
                //     from: source.index,
                //     to: destination?.index || 0
                // })
            }
        >
            <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
