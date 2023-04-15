import { FC } from "react"
import { UnsetImangeFooterInterface } from "../interfaces/SharedInterfaces"

const UnsetImangeFooter: FC<UnsetImangeFooterInterface> = ({ unsetImages, setCurrentUnsetImage }) => {
    return (
        <>
            <div style={{
                position: 'absolute', zIndex: 10, border: '1px solid black', backgroundColor: '#fefefefe',
                left: 0, right: 0, bottom: 0, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto',
                marginBottom: 'auto', height: '30vh', width: 'max-content', paddingLeft: '32px', paddingRight: '32px', flexDirection: 'column', justifyContent: 'center'
            }}>
                <p>Images that did not uplaod</p>
                <div style={{ position: 'relative', display: 'flex' }}>
                    {unsetImages.map((unsetImage: any, idx: number) => {
                        return (
                            <>
                                <img
                                    src={unsetImage.imageUrl}
                                    style={{ position: 'relative', height: 200, paddingLeft: 32, paddingRight: 32 }}
                                    id={unsetImages[idx].imgObj.name}
                                    onClick={(e) => { setCurrentUnsetImage({ imageName: e.currentTarget.id, imageIdx: idx }) }}
                                />
                            </>
                        )
                    })}
                </div>
            </div >
        </>
    )

}

export default UnsetImangeFooter