import styled from "styled-components";
import {useSelector} from "react-redux";
import {Switch} from "@gravity-ui/uikit";
import {reloadData, swapAdminState, swapShowVisitedState} from "../store/appSlice.ts";
import {RootState, useAppDispatch} from "../store/store.ts";
import {SortController} from "./sortController.tsx";
import {SearchController} from "./searchController.tsx";

const Header = styled.header`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default function ControlPanel() {
    const dispatch = useAppDispatch();
    const isAdmin = useSelector((state: RootState) => state.app.isAdmin);
    const showVisited = useSelector((state: RootState) => state.app.showVisited);

    return (
        <Header>
            <Switch onChange={() => dispatch(swapAdminState())}
                    checked={isAdmin}>
                {isAdmin ? 'Админ' : 'Обычный пользователь'}
            </Switch>

            <Switch onChange={() => {
                dispatch(swapShowVisitedState());
                dispatch(reloadData());
            }}
                    checked={showVisited}>
                {showVisited ? 'Посещённые показаны' : 'Посещённые скрыты'}
            </Switch>

            <SortController />
            <SearchController />
        </Header>
    )
}