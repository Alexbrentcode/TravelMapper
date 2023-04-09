import { useEffect, useState } from "react";
import GoogleMap from "../components/GoogleMap";
import { MetaDataInterface } from "../interfaces/SharedInterfaces"
import ImageUpload from "../components/ImageUpload";
import InteractiveMapWrapper from "../components/InteractiveMapWrapper";

const Homepage = () => {
    const [imageMetaData, setImageMetaData] = useState<MetaDataInterface[]>([]);

    //TODO: Remove - logging data
    useEffect(() => {
        imageMetaData.forEach((img) => {
            console.log(img)
        })
        console.log(`Arr length is ${imageMetaData.length}`)
    }, [imageMetaData])
  
    return (
        <>
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'flex-end',}}>
            <div style={{border: '1px solid black', width: 480, height: 480, flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 5, backgroundColor: 'white'}}>
            <ImageUpload 
                setImageMetaData={setImageMetaData}
            />
                <div style={{border: '1px solid black', width: 'auto', height: '50%', overflowY: 'scroll', textAlign: 'left', paddingLeft: 50}}>
                {imageMetaData.length > 0 && (
                    imageMetaData.map((imageData: any) => {
                        return (
                            <>
                                <p>Lat: {imageData.latitude}</p>
                                <p>Long: {imageData.longitude} </p>
                            </>
                        )
                    })
                )
                }
                </div>
            </div>
            <InteractiveMapWrapper
                imageMetaData={imageMetaData}
            /> 
        </div>
        </>
    )
}

export default Homepage