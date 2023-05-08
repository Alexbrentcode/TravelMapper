import styled from "@emotion/styled";
import { formatDateDDMMYYYYHHMM } from "../../helperMethods";
import { TripImageObject } from "../../interfaces/SharedInterfaces";
import { ImageCard } from "../../styles/StyledComponents";
import { FC, useState, useEffect } from "react";

const ImageListContainer = styled.div<{ selected: boolean }>`
    display: flex;
    margin-bottom: 8px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    background-color: ${(props) =>
        props.selected === true ? "#f9f9f9" : "white"};
    border-radius: 8px;
    min-width: 100%;
`;

interface ImageListObjectInterface {
    item: TripImageObject;
    index?: number;
    setSelectedUnsetItem: (value: any) => void;
    selectedUnsetItem: TripImageObject | null;
    listParent: string;
}

const ImageListObject: FC<ImageListObjectInterface> = ({
    item,
    index,
    setSelectedUnsetItem,
    selectedUnsetItem,
    listParent
}) => {
    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => {
        if (selectedUnsetItem === null) {
            setSelected(false);
        }
    }, [[selectedUnsetItem]]);

    const logTest = () => {
        if (listParent === "unset-images-dnd") {
            return;
        }
        if (selected) {
            setSelected(false);
            setSelectedUnsetItem(null);
        } else {
            if (!item.isSet) {
                console.log(item);
                setSelectedUnsetItem(item);
                setSelected(true);
            }
        }
    };
    return (
        <>
            <ImageListContainer onClick={logTest} selected={selected}>
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
                    <div
                        style={{
                            height: "100%",
                            padding: "0px 4px 0px 0px",
                            alignItems: "center"
                        }}
                    >
                        <h2>{index! + 1}</h2>
                    </div>
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
                            {item.dateTime
                                ? formatDateDDMMYYYYHHMM(item.dateTime)
                                : "Date unavailable"}
                        </h4>
                        {item.lng && item.lat ? (
                            <>
                                <h5
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                        fontWeight: 400,
                                        color: "#868e96"
                                    }}
                                >
                                    Lat: {item.lat}
                                </h5>

                                <h5
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                        fontWeight: 400,
                                        color: "#868e96"
                                    }}
                                >
                                    Lng: {item.lng}
                                </h5>
                            </>
                        ) : (
                            <h5
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    fontWeight: 400,
                                    color: "#868e96"
                                }}
                            >
                                Please set co-ordinates
                            </h5>
                        )}
                    </div>
                </div>
            </ImageListContainer>
        </>
    );
};

export default ImageListObject;
