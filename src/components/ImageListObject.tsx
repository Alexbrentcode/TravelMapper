import styled from "@emotion/styled";
import { formatDateDDMMYYYYHHMM } from "../helperMethods";
import { TripImageObject } from "../interfaces/SharedInterfaces";
import { ImageCard } from "../styles/StyledComponents";
import { FC } from "react";

const ImageListContainer = styled.div`
    display: flex;
    margin-bottom: 8px;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    background-color: white;
    border-radius: 8px;
    min-width: 100%;
`;

interface ImageListObjectInterface {
    item: TripImageObject;
}

const ImageListObject: FC<ImageListObjectInterface> = ({ item }) => {
    return (
        <>
            <ImageListContainer>
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
                            {/* {formatDateDDMMYYYYHHMM(item.dateTime)} */}
                        </h4>
                    </div>
                </div>
            </ImageListContainer>
        </>
    );
};

export default ImageListObject;
