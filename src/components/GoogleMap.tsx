import { FC, useEffect, useState } from "react";
import { GoogleMapInterface, MetaDataInterface } from "../interfaces/SharedInterfaces";
import ImageUpload from "./ImageUpload";

const GoogleMap:FC<GoogleMapInterface> = ({centralPosition, allMetaData}) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage ] = useState<MetaDataInterface>();

  const handleModalClose = () => {
    console.log('Closing modal')
    //e.stopPropagation();
    if(modalOpen){
      setModalOpen(false);
    }
  }

  useEffect(() => {
    console.log(currentImage)
  },[currentImage])

  async function initMap(): Promise<void> {
    // Initialize and add the map
      let map: any;
      // Request needed libraries.
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerView } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      let processedCoordinatesForLineDrawing: any = [];
      // The map, centered at Uluru
      map = new Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: 14,
          center: centralPosition,
          mapId: '31e4449696ca43c4',
        }
      );

      // const midPointMarker = new AdvancedMarkerView({
      //   map: map,
      //   position: centralPosition,
      //   title: 'Mid point marker'
      // }) 

      allMetaData.forEach((uploadedImage: any) => {
        var icon = {
          url: uploadedImage.imageUrl,
          scaledSize: new google.maps.Size(75, 75)
        }
        processedCoordinatesForLineDrawing.push(new google.maps.LatLng(uploadedImage.latitude, uploadedImage.longitude))

        const customImageMarker = new google.maps.Marker({
          map: map,
          position: {lat: uploadedImage.latitude, lng: uploadedImage.longitude},
          title: uploadedImage.imageName,
          icon: icon
        })

        customImageMarker.addListener('click', (e: any) => {
          const clickedImageName = e.domEvent.target.parentElement.title
          console.log(e.domEvent.target.parentElement.title)
          allMetaData.filter((el) => {
            if(el.imageName === clickedImageName ){
              setCurrentImage(el);
              setModalOpen(true);
            }
          })
        })
      })
      const placeholderPolyline = new google.maps.Polyline({
        map: map,
        path: processedCoordinatesForLineDrawing,
        visible: true,
        zIndex: 6,
        strokeColor: 'black'
      })

    }
    
    initMap();
    
    return (
        <>
            <div onClick={handleModalClose} id="map"></div>
            {modalOpen &&
            <div style={{padding: 30, width: 'max-content', height: 600, position: 'absolute', zIndex: 10, border: '1px solid black', backgroundColor: '#fefefefe',
             left: 0, right: 0, top: 0, bottom: 0, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'
            }}>
              {currentImage &&
              <>
                <img
                  src={currentImage?.imageUrl}
                  style={{height: '80%'}}
                />
                <p>Title: {currentImage?.imageName}</p>
                <p>Date Taken: {currentImage?.dateTime.toString()}</p>
                </>
            }
            </div>
            }
        </>
    )
}

export default GoogleMap;