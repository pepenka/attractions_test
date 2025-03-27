import {useSelector} from "react-redux";
import {Select, TextInput} from "@gravity-ui/uikit";
import {reloadData, setSearchType, setSearchValue} from "../store/appSlice.ts";
import {RootState, useAppDispatch} from "../store/store.ts";

export const SearchController = () => {
    const dispatch = useAppDispatch();
    const searchValue = useSelector((state: RootState) => state.app.searchValue);
    const options = [
        { value: 'none', content: '...' },
        { value: 'name', content: 'названии' },
        { value: 'description', content: 'описании' },
        { value: 'place', content: 'местоположении' },
    ];

    return (
        <>
            <Select onUpdate={(newValue) => {
                        dispatch(setSearchType(newValue[0]));
                        dispatch(reloadData());}}
                    options={options}
                    label="Искать в "
                    placeholder="..." />
            <TextInput placeholder="Поиск..."
                       value={searchValue}
                       onChange={e => {
                           dispatch(setSearchValue(e.target.value));
                           dispatch(reloadData());}}
                       hasClear={true} />
        </>
    )
}