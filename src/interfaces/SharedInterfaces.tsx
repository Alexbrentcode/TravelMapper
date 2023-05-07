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

export interface TripObject {
    tripStartObj: LocationDataObject;
    tripEndObj: LocationDataObject;
    tripImages?: TripImageObject[];
}

export interface LocationDataObject extends CoordianteInterface {
    locationName: string;
    locationAddress: string;
}

export interface AllUploadedImagesInterface {
    gpsImages?: TripImageObject[];
    noGpsImages?: TripImageObject[];
}

/**
 * COMPONENT INTERFACES
 */
export interface ImageUploadInterface {
    setTripObject: (value: any) => void;
    setImageUploadComplete: (value: any) => void;
    allUploadedImages: AllUploadedImagesInterface;
    setAllUploadedImages: (value: any) => void;
}

export interface GoogleMapInterface {
    allUploadedImages: AllUploadedImagesInterface;
    centralPosition: any;
    setUserSetCoordinates: any;
}

export interface InteractiveMapWrapperInterface {
    allUploadedImages: AllUploadedImagesInterface;
    setAllUploadedImages: (value: any) => void;
    tripObject: any;
    setTripObject: (value: any) => void;
}

export interface UnsetImangeFooterInterface {
    allUploadedImages: AllUploadedImagesInterface;
    setAllUploadedImages: (value: any) => void;
}

export interface MapObjectContainerInterface {
    tripObject: TripObject;
    allUploadedImages: AllUploadedImagesInterface;
    setAllUploadedImages: (value: any) => void;
}
