import * as React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";

interface Props {
    item: any;
    //     id: number;
}

export const Item = ({ item }: Props) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    console.log(item);
    return (
        <Reorder.Item
            as="li"
            value={item}
            id={item.id}
            key={item.id}
            style={{
                position: "relative",
                display: "flex",
                height: "110px",
                border: "1px solid black",
                marginBottom: "0px",
                padding: 0,
                width: "275px",
                boxShadow,
                backgroundColor: "white",
                y
            }}
        >
            <h2>{item.imageName}</h2>
        </Reorder.Item>
    );
};
