import styled from "styled-components";
import {useSelector} from "react-redux";
import {Button, Checkbox, Modal, TextInput} from "@gravity-ui/uikit";
import {RootState, useAppDispatch} from "../store/store.ts";
import {reloadData, swapOpenModal} from "../store/appSlice.ts";
import React, {useEffect, useState} from "react";
import {AttractionStatus} from "./attraction.tsx";
import {postAttraction, putAttraction} from "../json-server/api.ts";
import {DatePicker} from "@gravity-ui/date-components";
import {dateTimeParse} from "@gravity-ui/date-utils";
import {actions, AttractionForPost, ModalWindowDataInfo} from "../types.ts";

const AttractionForm = styled.form`
`

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding-bottom: 20px;
`

const SubmitAttractionButton = styled(Button)`
    width: 100%;
`

const ModalContentContainer = styled.div`
    padding: 10px;
`

export default function ModalWindow() {
    const dispatch = useAppDispatch();
    const open = useSelector((state: RootState) => state.app.openModal);
    const dataInfo: ModalWindowDataInfo = useSelector((state: RootState) => state.app.modalWindowDataInfo);
    const actionName: string = useSelector((state: RootState) => state.app.attractionActionName);

    const [isVisited, setIsVisited] = useState<boolean>(dataInfo.attraction?.status ?? false);
    const [name, setName] = useState<string>(dataInfo.attraction?.name ?? '');
    const [description, setDescription] = useState<string>(dataInfo.attraction?.description ?? '');
    const [date, setDate] = useState(dateTimeParse(dataInfo.attraction?.datetime) ?? '');
    const [rating, setRating] = useState<number | null>(dataInfo.attraction?.rating ?? null);
    const [url, setUrl] = useState<string>(dataInfo.attraction?.photoUrl ?? '');
    const [place, setPlace] = useState<string>(dataInfo.attraction?.place ?? '');
    const [latitude, setLatitude] = useState<string>(dataInfo.attraction?.placeLatitude ?? '');
    const [longitude, setLongitude] = useState<string>(dataInfo.attraction?.placeLongitude ?? '');

    useEffect(() => {
        setIsVisited(dataInfo.attraction?.status ?? false);
        setName(dataInfo.attraction?.name ?? '');
        setDescription(dataInfo.attraction?.description ?? '');
        setDate(dateTimeParse(dataInfo.attraction?.datetime,) ?? '');
        setRating(dataInfo.attraction?.rating ?? null);
        setUrl(dataInfo.attraction?.photoUrl ?? '');
        setPlace(dataInfo.attraction?.place ?? '');
        setLatitude(dataInfo.attraction?.placeLatitude ?? '');
        setLongitude(dataInfo.attraction?.placeLongitude ?? '');
    }, [dataInfo]);

    const onSubmit = async () => {
        if(name.length < 1 || description.length < 1
            || dateTimeParse(date)!.toString().length < 1 || rating!.toString().length < 1
            || url.length < 1 || place.length < 1
            || latitude.length < 1 || longitude.length < 1) {
            alert('Не все данные введены.');
            return;
        }

        const attraction: AttractionForPost = {
            name: name,
            description: description,
            datetime: date.toString(),
            rating: rating!,
            photoUrl: url,
            place: place,
            placeLatitude: latitude,
            placeLongitude: longitude,
            status: isVisited
        };

        if(dataInfo.action === actions.post) {
            await postAttraction(attraction);
        }
        else {
            await putAttraction(attraction, dataInfo.attraction!.id);
        }
        dispatch(swapOpenModal());
        dispatch(reloadData());
    };

    const onRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lastSymbol = e.target.value[e.target.value.length - 1];
        const value = parseFloat(lastSymbol);
        if(!isNaN(value)) {
            if (value >= 1 && value <= 5) {
                setRating(value);
            }
        }
    }

    return (
        <Modal open={open}
               onOpenChange={() => dispatch(swapOpenModal())}>
            <ModalContentContainer>
                <h1>{actionName} достопримечательности</h1>

                <AttractionForm>
                    <InputsContainer>
                        <TextInput
                            label={"Название"}
                            placeholder="Название достопримечательности..."
                            hasClear={true}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <TextInput placeholder="Описание достопримечательности..."
                                   value={description}
                                   onChange={e => setDescription(e.target.value)}
                                   hasClear={true}
                                   label={"Описание"}>
                        </TextInput>
                        <DatePicker
                            label={"Дата: "}
                            format="DD-MM-YYYY HH:mm"
                            value={dateTimeParse(date)}
                            onUpdate={e => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                setDate(dateTimeParse(e))
                            }} />
                        <TextInput placeholder="Рейтинг достопримечательности..."
                                   hasClear={true}
                                   label={"Рейтинг (от 1 до 5)"}
                                   value={rating?.toString()}
                                   onChange={onRatingChange}/>
                        <TextInput placeholder="URL фотографии..."
                                   hasClear={true}
                                   label={"URL фото"}
                                   value={url}
                                   onChange={e => setUrl(e.target.value)}/>
                        <TextInput placeholder="Местоположение достопримечательности..."
                                   hasClear={true}
                                   label={"Местоположение"}
                                   value={place}
                                   onChange={e => setPlace(e.target.value)}/>
                        <TextInput placeholder="Широта..."
                                   hasClear={true}
                                   label={"Широта"}
                                   value={latitude?.toString()}
                                   onUpdate={(e) => setLatitude(e)}/>
                        <TextInput placeholder="Долгота..."
                                   hasClear={true}
                                   label={"Долгота"}
                                   value={longitude?.toString()}
                                   onUpdate={(e) => setLongitude(e)}/>
                        <AttractionStatus>
                            <Checkbox checked={isVisited} onChange={() => setIsVisited(!isVisited)}>
                                {isVisited ? 'Посещено' : 'В планах'}
                            </Checkbox>
                        </AttractionStatus>
                    </InputsContainer>

                    <SubmitAttractionButton onClick={onSubmit}>
                        <span>Submit</span>
                    </SubmitAttractionButton>
                </AttractionForm>
            </ModalContentContainer>
        </Modal>
    )
}