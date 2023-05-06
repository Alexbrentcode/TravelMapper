import { FC, useEffect, useState } from "react";
import { MapObjectContainerInterface } from "../interfaces/SharedInterfaces";
import { Reorder, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import { Item } from "./Item";

const MapObjectContaienr: FC<MapObjectContainerInterface> = ({
    tripObject,
    setImageMetaData,
    imageMetaData
}) => {
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
                //overflowY: "scroll"
            }}
        >
            <div style={{ position: "relative", height: "15%" }}>
                <h1> Your Route</h1>
            </div>
            {imageMetaData && (
                <Reorder.Group
                    // layoutScroll
                    axis="y"
                    onReorder={setImageMetaData}
                    values={imageMetaData}
                    as="div"
                >
                    {imageMetaData.map((item: any, index: number) => (
                        <Item key={item.id} item={item} />
                    ))}
                </Reorder.Group>
            )}
        </div>
    );
};
export default MapObjectContaienr;
