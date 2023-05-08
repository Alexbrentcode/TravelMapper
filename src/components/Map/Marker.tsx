import { FC } from "react";

interface MarkerProps {
    lat: number;
    lng: number;
    imageName: string;
    index: number;
}

const Marker: FC<MarkerProps> = ({ lat, lng, imageName, index }) => {
    console.log(`${lat} + ${lng}`);
    return (
        <>
            <div
                style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "white",
                    borderRadius: "55%",
                    border: "5px solid blue",
                    boxSizing: "border-box",
                    color: "black"
                }}
            >
                <h1 style={{ padding: 0, margin: 0 }}>{index + 1}</h1>
            </div>
        </>
    );
};

export default Marker;
