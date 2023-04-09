import { FC, useEffect } from "react";
import { GoogleMapInterface } from "../interfaces/SharedInterfaces";
import ImageUpload from "./ImageUpload";

const GoogleMap:FC<GoogleMapInterface> = ({centralPosition, allMetaData}) => {

  async function initMap(): Promise<void> {
    // Initialize and add the map
      let map: any;
      // Request needed libraries.
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerView } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    
      // The map, centered at Uluru
      map = new Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: 14,
          center: centralPosition,
          mapId: '31e4449696ca43c4',
        }
      );

      const midPointMarker = new AdvancedMarkerView({
        map: map,
        position: {lat: 54.4880875, lng: -3.210903472222222},
        title: 'Mid point marker'
      }) 

      allMetaData.forEach((uploadedImage: any) => {
        var icon = {
          url: uploadedImage.imageUrl,
          scaledSize: new google.maps.Size(75, 75)
        }

        const customImageMarker = new google.maps.Marker({
          map: map,
          position: {lat: uploadedImage.latitude, lng: uploadedImage.longitude},
          title: uploadedImage.imageName,
          icon: icon
        })

      })

    }
    
    initMap();
    
    return (
        <>
            <div id="map"></div>
        </>
    )
}

export default GoogleMap;