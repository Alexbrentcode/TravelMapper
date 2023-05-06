/**
 * OBJECT INTERFACES
 */
export interface CoordianteInterface {
    lat: any;
    lng: any;
}

export interface TripImageObject extends CoordianteInterface {
    imageUrl: string;
    imageName: string;
    imageId: string;
    orientation?: string;
    dateTime?: any;
    dateTimeSeconds?: any;
}

export interface ImageWithNoGpsMetaDataInterface {
    imageUrl: string;
    imageName: string;
    imgObj: any;
}

export interface TripObject {
    tripStartObj: LocationDataObject;
    tripEndObj: LocationDataObject;
    tripImages?: TripImageObject[];
}

export interface LocationDataObject extends CoordianteInterface {
    locationName: string;
    locationAddress: string;
}

/**
 * COMPONENT INTERFACES
 */
export interface ImageUploadInterface {
    setImageMetaData: (value: any) => void;
    setImagesWithoutGPSMetaData: (value: any) => void;
    setTripObject: (value: any) => void;
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
    setImagesWithoutGPSMetaData: (value: any) => void;
    tripObject: any;
    setTripObject: (value: any) => void;
}

export interface UnsetImangeFooterInterface {
    unsetImages: ImageWithNoGpsMetaDataInterface[];
    setCurrentUnsetImage: (value: any) => void;
}

export interface MapObjectContainerInterface {
    tripObject: TripObject;
    setImageMetaData: (value: any) => void;
    imageMetaData: TripImageObject[];
}
