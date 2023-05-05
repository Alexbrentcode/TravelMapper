import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";

interface Props {
  item: string;
}

export const Item = ({ item }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item value={item} id={item} style={{ boxShadow, y }}>
                                 <div style={{ position: 'relative', display: 'flex', minHeight: '110px', border: '1px solid black', marginBottom: '5px', boxSizing: 'border-box', padding: 8 }}>
                                                {/* <img src={item.imageUrl} style={{ display: 'block', position: 'relative', border: '1px solid red', width: '30%', marginRight: 8 }}></img>
                                                <div style={{ display: 'block', position: 'relative', boxSizing: 'border-box', border: '1px solid black', width: '100%', height: '100%' }}
                                                > <h2>{item.imageName}</h2></div> */}
              <span>{item}</span>
                                            </div>

    </Reorder.Item>
  );
};
