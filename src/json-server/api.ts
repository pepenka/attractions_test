import {Attraction, AttractionForPost} from "../types.ts";

const url = "http://localhost:3000"

export async function fetchAttractions() {
    try {
        const response = await fetch(url + '/attractions');
        const data: Attraction[] = await response.json();
        return data;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export async function postAttraction(attraction: AttractionForPost) {
    try {
        await fetch(url + '/attractions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attraction)
        });
    }
    catch (e) {
        console.log(e);
    }
}

export async function putAttraction(attraction: AttractionForPost, id: string) {
    try {
        await fetch(url + `/attractions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attraction)
        });
    }
    catch (e) {
        console.log(e);
    }
}

export async function deleteAttraction(attractionId: string) {
    try {
        await fetch(url + `/attractions/${attractionId}`, {
            method: 'DELETE',
        });
    }
    catch (e) {
        console.log(e);
    }
}