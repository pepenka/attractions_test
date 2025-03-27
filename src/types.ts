export enum actions {
    post = 'post',
    put = 'put'
}

export interface Attraction {
    id: string,
    name: string,
    description: string,
    datetime: string,
    rating: number,
    photoUrl: string,
    place: string,
    placeLatitude: string,
    placeLongitude: string,
    status: boolean
}

export interface AttractionForPost {
    name: string | undefined,
    description: string | undefined,
    datetime: string | undefined,
    rating: number | undefined,
    photoUrl: string | undefined
    place: string | undefined,
    placeLatitude: string | undefined,
    placeLongitude: string | undefined,
    status: boolean | undefined
}

export interface ModalWindowDataInfo {
    attraction: Attraction | null;
    action: actions;
}