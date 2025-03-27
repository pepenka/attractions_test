import styled from "styled-components";
import {Plus} from '@gravity-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {setAttractionActionName, setModalWindowDataInfo, swapOpenModal} from "../store/appSlice.ts";
import {actions} from "../types.ts";

const AddButtonComponent = styled.button`
    align-items: center;
    
    font-size: 22px;
    
    width: max-content;
    height: max-content;
    padding: 6px;
    margin-bottom: 40px;
    
    border: none;
    border-radius: 8px;
    
    &:hover {
        cursor: pointer;
    }
`

const AddIcon = styled(Plus)`
    width: 30px;
    height: 30px;
`

export function AddButton() {
    const isAdmin = useSelector((state: RootState) => state.app.isAdmin);
    const dispatch = useDispatch();

    return (
        <AddButtonComponent
            disabled={!isAdmin}
            style={{display: isAdmin ? 'flex' : 'none'}}
            onClick={() => {
                dispatch(setAttractionActionName('Создание'));
                dispatch(setModalWindowDataInfo({attraction: null, action: actions.post}));
                dispatch(swapOpenModal())
            }}>
            <AddIcon />Новая достопримечательность
        </AddButtonComponent>
    )
}