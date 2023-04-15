/**
 * OBJECT INTERFACES
 */
export interface CoordianteInterface {
    lat: any,
    lng: any
}

export interface TripImageObject extends CoordianteInterface {
    imageUrl: string,
    imageName: string,
    orientation?: string,
    dateTime?: any
}

export interface ImageWithNoGpsMetaDataInterface {
    imageUrl: string,
    imageName: string,
    imgObj: any
}


export interface TripObject {
    tripStarObj: LocationDataObject;
    tripEndObj: LocationDataObject;
    tripImages: TripImageObject[];
}

export interface LocationDataObject {
    locationName: string;
    locationAddress: string;
}

/**
 * COMPONENT INTERFACES
 */
export interface ImageUploadInterface {
    setImageMetaData: (value: any) => void;
    setImagesWithoutGPSMetaData: (value: any) => void;
}

export interface GoogleMapInterface {
    centralPosition: any;
    allMetaData: TripImageObject[];
    setUserSetCoordinates: any;
}

export interface InteractiveMapWrapperInterface {
    imageMetaData: TripImageObject[];
    imagesWithoutGPSMetaData: ImageWithNoGpsMetaDataInterface[];
    setImageMetaData: (value: any) => void;
}

export interface UnsetImangeFooterInterface {
    unsetImages: ImageWithNoGpsMetaDataInterface[],
    setCurrentUnsetImage: (value: any) => void;
}
