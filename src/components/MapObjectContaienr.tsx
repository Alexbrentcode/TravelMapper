import { FC, useEffect, useState } from "react";
import { MapObjectContainerInterface } from "../interfaces/SharedInterfaces";
import { Reorder, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import { Item } from "./Item";

 const MapObjectContaienr: FC<MapObjectContainerInterface> = ({ tripObject, setImageMetaData, imageMetaData }) => {
//     const [newState, setNewState] = useState<any>([]);
//     const [bool, setBool] = useState<boolean>(false);

//     // const y = useMotionValue(0);  const boxShadow = useRaisedShadow(y);

//     useEffect(() => {
//         // setNewState(imageMetaData)
//         setBool(true);
//     }, [imageMetaData])

//     return (
//         <>
//             <div style={{
//                 width: '25%', height: '100%', flexDirection: 'column', display: 'flex',
//                 alignItems: 'center', position: 'absolute', zIndex: 5, backgroundColor: 'white', overflowY: 'scroll'
//             }}>
//                 <div style={{position: 'relative', height: '15%'}}>
//                     <h1> Your Route</h1>
//                 </div>
        
//                 {bool && (
//                     <div style={{ display: 'flex', width: '100%', height: '85%', flexDirection: 'column' }}>
//                         <Reorder.Group axis="y" onReorder={setNewState} values={newState}>
//                             {newState.map((item: any) => {
//                                 return (
//                                     <>
//                                         <Reorder.Item as="div" value={item} key={item.id} >
//                                             <div style={{ position: 'relative', display: 'flex', minHeight: '110px', border: '1px solid black', marginBottom: '5px', boxSizing: 'border-box', padding: 8 }}>
//                                                 <img src={item.imageUrl} style={{ display: 'block', position: 'relative', border: '1px solid red', width: '30%', marginRight: 8 }}></img>
//                                                 <div style={{ display: 'block', position: 'relative', boxSizing: 'border-box', border: '1px solid black', width: '100%', height: '100%' }}
//                                                 > <h2>{item.imageName}</h2></div>
//                                             </div>
//                                         </Reorder.Item>
//                                     </>
//                                 )
//                             })}
//                         </Reorder.Group>
//                     </div>
//                 )}
//             </div >
//         </>

//     )
// }
const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

//function MapObjectContaienr() {
    const [items, setItems] = useState(initialItems);
      const y = useMotionValue(0);  const boxShadow = useRaisedShadow(y);

    return <div style={{
                width: '25%', height: '100%', flexDirection: 'column', display: 'flex',
                alignItems: 'center', position: 'absolute', zIndex: 5, backgroundColor: 'white', overflowY: 'scroll'
            }}>
                <div style={{position: 'relative', height: '15%'}}>
                    <h1> Your Route</h1>
                </div>
        
                    <Reorder.Group axis="y" onReorder={setItems} values={items}>
                        {items.map((item:any) => (
                            <Item key={item} item={item} />
                        ))}
                    </Reorder.Group>
            </div>
}
export default MapObjectContaienr;