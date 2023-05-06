import { FC } from "react";
import {
    MapObjectContainerInterface,
    TripImageObject
} from "../interfaces/SharedInterfaces";
import { createStyles, Text, rem } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MapObjectContaienr: FC<MapObjectContainerInterface> = ({
    tripObject,
    imageMetaData,
    setImageMetaData
}) => {
    console.log(imageMetaData);

    const useStyles = createStyles((theme) => ({
        item: {
            ...theme.fn.focusStyles(),
            display: "flex",
            alignItems: "center",
            borderRadius: theme.radius.lg,
            border: `${rem(1)} solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[2]
            }`,
            padding: `${theme.spacing.xs} ${theme.spacing.xs}`
        },
        itemDragging: {
            boxShadow: theme.shadows.sm
        }
    }));

    const DndList = (data: TripImageObject[]) => {
        const { classes, cx } = useStyles();
        const [state, handlers] = useListState(data);
        const items = state.map((item: any, index: number) => (
            <Draggable
                key={item.imageId}
                index={index}
                draggableId={item.imageId}
            >
                {(provided, snapshot) => (
                    <div
                        className={cx(classes.item, {
                            [classes.itemDragging]: snapshot.isDragging
                        })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                height: "100px",
                                border: "1px solid black",
                                boxSizing: "border-box"
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
                            ></img>
                            <div
                                style={{
                                    display: "block",
                                    position: "relative",
                                    boxSizing: "border-box",

                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                {" "}
                                <h2>{item.imageName}</h2>
                            </div>
                        </div>
                    </div>
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
                overflowY: "scroll"
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
