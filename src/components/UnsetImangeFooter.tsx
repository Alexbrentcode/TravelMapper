import { FC } from "react";
import {
    TripImageObject,
    UnsetImangeFooterInterface
} from "../interfaces/SharedInterfaces";
import ImageListObject from "./ImageListObject";
import { dragAndDropComponent } from "../helperMethods";

const UnsetImangeFooter: FC<UnsetImangeFooterInterface> = ({
    allUploadedImages,
    setAllUploadedImages
}) => {
    const testData: TripImageObject[] = [
        {
            imageUrl:
                "blob:http://localhost:5173/eaa54822-df28-4f8c-9092-43a4f4637d00",
            imageName: "IMG_0925.jpg",
            lat: null,
            lng: null,
            orientation: "Horizontal (normal)",
            dateTime: "2023-03-31T23:47:11.000Z",
            dateTimeSeconds: 1680306431000,
            imageId: "b578650a-764e-446c-92d8-6abce7d8c242"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/966a61d9-a3cd-4adc-b44d-3abf79ca5108",
            imageName: "IMG_0928.jpg",
            lat: null,
            lng: null,
            orientation: "Horizontal (normal)",
            dateTime: "2023-04-01T08:44:19.000Z",
            dateTimeSeconds: 1680338659000,
            imageId: "13a2e471-c885-4f0e-85a0-4b36b6927951"
        },
        {
            imageUrl:
                "blob:http://localhost:5173/2f333a70-77a7-442b-9420-8cd4c7cc5d8e",
            imageName: "IMG_0931.jpg",
            lat: null,
            lng: null,
            orientation: "Rotate 90 CW",
            dateTime: "2023-04-01T08:51:28.000Z",
            dateTimeSeconds: 1680339088000,
            imageId: "0331c864-5bcf-41bb-80c1-f77494f72207"
        }
    ];

    return (
        <>
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    backgroundColor: "#fefefefe",
                    display: "flex",
                    flexDirection: "column",
                    height: "30vh"
                }}
            >
                {/* {dragAndDropComponent(testData)} */}
                {/* {unsetImages.map((unsetImage: any, idx: number) => {
                    return (
                        <ImageListObject item={unsetImage} />
                        //     id={unsetImages[idx].imgObj.name}
                        //     onClick={(e) => {
                        //         setCurrentUnsetImage({
                        //             imageName: e.currentTarget.id,
                        //             imageIdx: idx
                        //         });
                        //     }}
                        // />
                    );
                })} */}
            </div>
        </>
    );
};

export default UnsetImangeFooter;
