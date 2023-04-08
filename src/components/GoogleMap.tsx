import { FC, useEffect } from "react";
import { GoogleMapInterface } from "../interfaces/SharedInterfaces";

const GoogleMap:FC<GoogleMapInterface> = ({position}) => {
    async function initMap(): Promise<void> {
        // The location of Uluru
      
      // Initialize and add the map
        let map;
        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerView } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      
        // The map, centered at Uluru
        map = new Map(
          document.getElementById('map') as HTMLElement,
          {
            zoom: 4,
            center: position,
            mapId: '31e4449696ca43c4',
          }
        );
      
        // The marker, positioned at Uluru
        const marker = new AdvancedMarkerView({
          map: map,
          position: position,
          title: 'Uluru'
        });
      }
      
      initMap();
      
    return (
        <>
            <div id="map"></div>
        </>
    )
}

export default GoogleMap;