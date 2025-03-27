import styled from "styled-components";
import {Checkbox} from "@gravity-ui/uikit";
import React from "react";
import {deleteAttraction} from "../json-server/api.ts";
import {PencilToLine} from '@gravity-ui/icons';
import {TrashBin} from '@gravity-ui/icons';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../store/store.ts";
import {
    reloadData,
    setAttractionActionName,
    setModalWindowDataInfo,
    swapOpenModal
} from "../store/appSlice.ts";
import {actions, Attraction} from "../types.ts";

const AttractionContainer = styled.div`
    max-width: 650px;
    width: max-content;
    display: flex;
    
    border-bottom: 1px #ccc solid;
    &:last-child {
        border-bottom: none;
    }
`

const AttractionContentContainer = styled.div`
    max-width: 600px;
    
    display: flex;
    flex-direction: column;
    &>* {
        margin: 10px 0;
    }
`

const AttractionImage = styled.img`
    width: 100%;
    border-radius: 8px;
    margin-top: 0;
`

const AttractionName = styled.h2`
`

const AttractionRating = styled.div`
    font-size: 16px;
    color: gold;
`

const AttractionText = styled.p`
    font-size: 16px;
`

const MapLink = styled.a`
    text-decoration: none;
    font-size: 16px;
    
    &:hover {
        text-decoration: underline;
    }
`

export const AttractionStatus = styled.div`
    & strong {
        display: block;
    }
`

const AttractionControlPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    &>* {
        width: 35px;
        height: 35px;
        margin-left: 20px;
    }
`

export default function AttractionComponent(attraction: Attraction): React.ReactElement<Attraction> {
    const isAdmin = useSelector((state: RootState) => state.app.isAdmin);
    const dispatch = useAppDispatch();

    return (
        <AttractionContainer>
            <AttractionContentContainer>
                <AttractionImage src={attraction.photoUrl} alt="Фото достопримечательности"/>

                <AttractionName>{attraction.name}</AttractionName>

                <AttractionRating>
                    {`${'★'.repeat(Math.floor(attraction.rating))}${'☆'.repeat(5 - Math.floor(attraction.rating))}`}
                </AttractionRating>

                <AttractionText>{attraction.description}</AttractionText>

                <AttractionText><strong>Добавлено: </strong>{attraction.datetime}</AttractionText>

                <AttractionText><strong>Местоположение: </strong>{attraction.place}</AttractionText>

                <AttractionText><strong>Координаты:</strong> {attraction.placeLatitude} N, {attraction.placeLongitude} E</AttractionText>

                <MapLink href={`https://www.google.com/maps?q=${attraction.placeLatitude},${attraction.placeLongitude}`} target="_blank">
                    Посмотреть на Google Maps
                </MapLink>

                <AttractionStatus>
                    <strong>Статус:</strong>
                    <Checkbox disabled={true} checked={attraction.status}>
                        {attraction.status ? 'Посещено' : 'В планах'}
                    </Checkbox>
                </AttractionStatus>
            </AttractionContentContainer>

            <AttractionControlPanel>
                <PencilToLine
                    display={!isAdmin ? "none" : "flex"}
                    onClick={() => {
                        dispatch(setAttractionActionName('Редактирование'));
                        dispatch(setModalWindowDataInfo({attraction: attraction, action: actions.put}));
                        dispatch(swapOpenModal());
                    }}>
                </PencilToLine>
                <TrashBin
                    display={!isAdmin ? "none" : "flex"}
                    onClick={async () => {
                        await deleteAttraction(attraction.id);
                        dispatch(reloadData());
                    }}>

                </TrashBin>
            </AttractionControlPanel>
        </AttractionContainer>
    )
}