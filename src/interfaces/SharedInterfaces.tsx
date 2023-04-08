export interface MetaDataInterface {
    imageUrl: string,
    latitude: number,
    longitude: number,
}

export interface ImageUploadInterface {
    setImageMetaData: (value: any) => void;
}

export interface GoogleMapsCoordinates {
    lat: any,
    lng: any
}

export interface GoogleMapInterface {
    position: any;
}

export interface InteractiveMapWrapperInterface {
    //TODO replace when coordinate logic is fin
    imageMetaData:  MetaDataInterface[];
}