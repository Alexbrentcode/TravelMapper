import { FC } from "react";
import { MapObjectContainerInterface } from "../interfaces/SharedInterfaces";

const MapObjectContaienr: FC<MapObjectContainerInterface> = ({ tripObject }) => {

    return (
        <>
            <div style={{
                width: '25%', height: '100%', flexDirection: 'column', display: 'flex',
                alignItems: 'center', position: 'absolute', zIndex: 5, backgroundColor: 'white', overflowY: 'scroll'
            }}>
                <div style={{position: 'relative', height: '15%'}}>
                    <h1> Your Route</h1>
                </div>
         
                <div style={{ display: 'flex', width: '100%', height: '85%', flexDirection: 'column' }}>

                    {tripObject.tripImages?.map((item: any) => {
                        return (
                            <>
                                <div style={{ position: 'relative', display: 'flex', minHeight: '110px', border: '1px solid black', marginBottom: '5px', boxSizing: 'border-box', padding: 8 }}>
                                    <div style={{ display: 'block', position: 'relative', border: '1px solid red', width: '30%', marginRight: 8 }}></div>
                                    <div style={ {display: 'block', position: 'relative', boxSizing: 'border-box', border: '1px solid black', width: '100%', height: '100%'}}
                                    ></div>
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