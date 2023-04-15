export interface MetaDataInterface {
    imageUrl: string,
    imageName: string,
    latitude: number,
    longitude: number,
    orientation?: string,
    dateTime?: any
}

export interface ImageWithNoGpsMetaDataInterface {
    imageUrl: string,
    imageName: string,
    imgObj: any
}

export interface ImageUploadInterface {
    setImageMetaData: (value: any) => void;
    setImagesWithoutGPSMetaData: (value: any) => void;
    setTripLocations: (value: any) => void;
}

export interface GoogleMapsCoordinates {
    lat: any,
    lng: any
}

export interface GoogleMapInterface {
    centralPosition: any;
    allMetaData: MetaDataInterface[];
    setUserSetCoordinates: any;
}

export interface InteractiveMapWrapperInterface {
    //TODO replace when coordinate logic is fin
    imageMetaData: MetaDataInterface[];
    imagesWithoutGPSMetaData: ImageWithNoGpsMetaDataInterface[];
    setImageMetaData: (value: any) => void;
}

export interface UnsetImangeFooterInterface {
    unsetImages: ImageWithNoGpsMetaDataInterface[],
    setCurrentUnsetImage: (value: any) => void;
}

export interface TripLocationInterface {
    tripStart: tripLocationDetails;
    tripEnd: tripLocationDetails;
}

export interface tripLocationDetails {
    locationName: string;
    lat: any,
    lng: any
}