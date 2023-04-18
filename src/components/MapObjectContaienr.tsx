import { FC } from "react";
import { MapObjectContainerInterface } from "../interfaces/SharedInterfaces";

const MapObjectContaienr: FC<MapObjectContainerInterface> = ({ tripObject }) => {

    console.log(`Recieved trip images ${JSON.stringify(tripObject.tripImages)}`)
    return (
        <>
            <div style={{
                width: 480, height: '100%', flexDirection: 'column', display: 'flex',
                alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 5, backgroundColor: 'white'
            }}>
                <h1> Your Route</h1>
                <div style={{ display: 'flex', width: '100%', height: 'max-content', flexDirection: 'column' }}>

                    {tripObject.tripImages?.map((item: any) => {
                        return (
                            <>
                                <div style={{ height: '100px', border: '1px solid black' }}>
                                    <p>{item.imageName}</p>
                                </div>

                            </>
                        )
                    })}
                </div>
            </div >
        </>

    )
}

export default MapObjectContaienr;