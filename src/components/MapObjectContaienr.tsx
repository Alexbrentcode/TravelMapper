import { FC } from "react";
import {
    MapObjectContainerInterface,
    TripImageObject
} from "../interfaces/SharedInterfaces";
import {
    ActionIcon,
    Button,
    createStyles,
    useMantineTheme
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { Edit } from "tabler-icons-react";
import { formatDateDDMMYYYYHHMM } from "../helperMethods";

const ImageCard = styled.div`
    display: flex;
    margin-bottom: 8px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    background-color: white;
    border-radius: 8px;
    width: 100%;
`;

const MapObjectContaienr: FC<MapObjectContainerInterface> = ({
    tripObject,
    imageMetaData,
    setImageMetaData
}) => {
    console.log(imageMetaData);

    // const useStyles = createStyles((theme) => ({
    //     item: {
    //         ...theme.fn.focusStyles(),
    //         display: "flex",
    //         alignItems: "center",
    //         borderRadius: theme.radius.lg,
    //         border: `${rem(1)} solid ${
    //             theme.colorScheme === "dark"
    //                 ? theme.colors.dark[5]
    //                 : theme.colors.gray[2]
    //         }`,
    //         padding: `${theme.spacing.xs} ${theme.spacing.xs}`
    //     },
    //     itemDragging: {
    //         boxShadow: theme.shadows.sm
    //     }
    // }));

    const DndList = (data: TripImageObject[]) => {
        //const { classes, cx } = useStyles();
        const [state, handlers] = useListState(data);
        const items = state.map((item: any, index: number) => (
            <Draggable
                key={item.imageId}
                index={index}
                draggableId={item.imageId}
            >
                {(provided, snapshot) => (
                    <ImageCard
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {/* <Button
                            style={{ height: "max-content", width: "45px" }}
                            leftIcon={<Edit />}
                        ></Button> */}
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                height: "100px",
                                boxSizing: "border-box",
                                padding: "8px"
                            }}
                        >
                            <img
                                src={item.imageUrl}
                                style={{
                                    display: "block",
                                    position: "relative",
                                    width: "30%",
                                    marginRight: 8
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    position: "relative",
                                    boxSizing: "border-box",
                                    width: "100%",
                                    height: "100%",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                    userSelect: "none"
                                }}
                            >
                                <h3 style={{ padding: 0, margin: 0 }}>
                                    {item.imageName}
                                </h3>
                                <h4
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                        fontWeight: 400,
                                        color: "#868e96"
                                    }}
                                >
                                    {formatDateDDMMYYYYHHMM(item.dateTime)}
                                </h4>
                            </div>
                        </div>
                    </ImageCard>
                )}
            </Draggable>
        ));

        return (
            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    handlers.reorder({
                        from: source.index,
                        to: destination?.index || 0
                    })
                }
            >
                <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {items}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };

    const testData: TripImageObject[] = [
        {
            imageUrl:
                "blob:http://localhost:5173/eaa54822-df28-4f8c-9092-43a4f4637d00",
            imageName: "IMG_0925.jpg",
            lat: 54.518002777777774,
            lng: -3.151933333333333,
            orientation: "Horizontal (normal)",
            dateTime: "2023-03-31T23:47:11.000Z",
            dateTimeSeconds: 1680306431000,
            imageId: "b578650a-764e-446c-92d8-6abce7d8c242"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/966a61d9-a3cd-4adc-b44d-3abf79ca5108",
            imageName: "IMG_0928.jpg",
            lat: 54.51626111111111,
            lng: -3.1541888888888887,
            orientation: "Horizontal (normal)",
            dateTime: "2023-04-01T08:44:19.000Z",
            dateTimeSeconds: 1680338659000,
            imageId: "13a2e471-c885-4f0e-85a0-4b36b6927951"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/2f333a70-77a7-442b-9420-8cd4c7cc5d8e",
            imageName: "IMG_0931.jpg",
            lat: 54.514519444444446,
            lng: -3.1590666666666665,
            orientation: "Rotate 90 CW",
            dateTime: "2023-04-01T08:51:28.000Z",
            dateTimeSeconds: 1680339088000,
            imageId: "0331c864-5bcf-41bb-80c1-f77494f72207"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/0469c680-f6fe-4fd8-917f-c80f64c159b4",
            imageName: "IMG_0933.jpg",
            lat: 54.51262777777778,
            lng: -3.1631638888888887,
            orientation: "Horizontal (normal)",
            dateTime: "2023-04-01T08:57:49.000Z",
            dateTimeSeconds: 1680339469000,
            imageId: "72182e78-0377-428a-b65c-9c260d75f0c2"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/246f508a-2c06-48e5-b620-d346f011560b",
            imageName: "IMG_0935.jpg",
            lat: 54.50193055555555,
            lng: -3.1795527777777775,
            orientation: "Horizontal (normal)",
            dateTime: "2023-04-01T09:21:44.000Z",
            dateTimeSeconds: 1680340904000,
            imageId: "3c50ade2-6341-4761-b186-e6cc7b330b02"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/02c755a7-40d5-4fc2-980e-0b9f24343fa8",
            imageName: "IMG_0940.jpg",
            lat: 54.49931388888889,
            lng: -3.1886249999999996,
            orientation: "Horizontal (normal)",
            dateTime: "2023-04-01T09:39:01.000Z",
            dateTimeSeconds: 1680341941000,
            imageId: "18db5479-f9d7-4f5c-b34d-81994f28e2a3"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/b183a75c-5d7f-42a2-9ea6-06a36db5eb32",
            imageName: "IMG_0941.jpg",
            lat: 54.49931388888889,
            lng: -3.1886027777777777,
            orientation: "Rotate 90 CW",
            dateTime: "2023-04-01T09:39:05.000Z",
            dateTimeSeconds: 1680341945000,
            imageId: "95c8d792-6aef-4906-bb17-68d0fd50ff12"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/b0772002-b845-468d-b0f4-afd277496ede",
            imageName: "IMG_0945.jpg",
            lat: 54.49932777777778,
            lng: -3.193861111111111,
            orientation: "Horizontal (normal)",
            dateTime: "2023-04-01T10:06:20.000Z",
            dateTimeSeconds: 1680343580000,
            imageId: "7604d78e-2113-47a9-9b79-94c5fc1f613c"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/d237938b-5238-48a6-ae3f-be69a1331e13",
            imageName: "IMG_0946.jpg",
            lat: 54.48933888888889,
            lng: -3.203613888888889,
            orientation: "Rotate 90 CW",
            dateTime: "2023-04-01T10:47:23.000Z",
            dateTimeSeconds: 1680346043000,
            imageId: "fb3a8bbe-2827-4e41-88b2-f67c3c785a5b"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/2ec0bc7d-1d3d-4be3-a421-17d2fc4bded9",
            imageName: "IMG_0952.jpg",
            lat: 54.48922777777778,
            lng: -3.203466666666667,
            orientation: "Horizontal (normal)",
            dateTime: "2023-04-01T10:48:29.000Z",
            dateTimeSeconds: 1680346109000,
            imageId: "a3b06dd1-7719-4868-b13c-ccf00b712f0b"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/3b1200d1-cf71-4a40-aca3-3d9393871350",
            imageName: "IMG_0955.jpg",
            lat: 54.48923611111111,
            lng: -3.203463888888889,
            orientation: "Rotate 90 CW",
            dateTime: "2023-04-01T10:48:41.000Z",
            dateTimeSeconds: 1680346121000,
            imageId: "709867f4-3780-4db3-b4e7-a6499993012f"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/89bea2cb-cb5c-4deb-9ee8-20007bc9620a",
            imageName: "IMG_0957.jpg",
            lat: 54.48829722222222,
            lng: -3.206566666666667,
            orientation: "Horizontal (normal)",
            dateTime: "2023-04-01T11:01:41.000Z",
            dateTimeSeconds: 1680346901000,
            imageId: "501c11f8-1d8b-4dff-8b0b-9476437bc541"
        }
    ];

    return (
        <div
            style={{
                width: "25%",
                height: "100%",
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                position: "absolute",
                zIndex: 5,
                backgroundColor: "white",
                overflowY: "scroll",
                boxSizing: "border-box"
            }}
        >
            <div style={{ position: "relative", height: "15%" }}>
                <h1> Your Route</h1>
            </div>
            {DndList(imageMetaData)}
        </div>
    );
};

export default MapObjectContaienr;
