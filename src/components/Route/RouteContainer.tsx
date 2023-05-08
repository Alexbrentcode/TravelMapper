import { FC } from "react";
import { MapObjectContainerInterface } from "../../interfaces/SharedInterfaces";
import { dragAndDropComponent } from "../../helperMethods";

const RouteContainer: FC<MapObjectContainerInterface> = ({
    tripObject,
    allUploadedImages,
    setAllUploadedImages,
    setSelectedUnsetItem,
    selectedUnsetItem
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
                boxSizing: "border-box"
            }}
        >
            <div style={{ position: "relative", height: "10%" }}>
                <h1> Your Route</h1>
            </div>

            {dragAndDropComponent(
                allUploadedImages,
                setAllUploadedImages,
                setSelectedUnsetItem,
                selectedUnsetItem
            )}
        </div>
    );
};

export default RouteContainer;
