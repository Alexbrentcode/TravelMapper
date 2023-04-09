import { FC, useEffect } from "react";
import { GoogleMapInterface } from "../interfaces/SharedInterfaces";
import ImageUpload from "./ImageUpload";

const GoogleMap:FC<GoogleMapInterface> = ({centralPosition, allMetaData}) => {
    async function initMap(): Promise<void> {
        // The location of Uluru
      
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
            zoom: 4,
            center: centralPosition,
            mapId: '31e4449696ca43c4',
          }
        );
      
        // The marker, positioned at Uluru
        allMetaData.forEach((uploadedImage: any) => {
          const marker = new AdvancedMarkerView({
            map: map,
            position: {lat: uploadedImage.latitude, lng: uploadedImage.longitude},
            title: 'Uluru'
          });
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