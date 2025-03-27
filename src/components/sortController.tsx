import {Select} from '@gravity-ui/uikit';
import {reloadData, setSortType} from "../store/appSlice.ts";
import {useAppDispatch} from "../store/store.ts";

export const SortController = () => {
    const dispatch = useAppDispatch();
    const options = [
        { value: 'none', content: '...' },
        { value: 'date', content: 'дате' },
        { value: 'rating', content: 'рейтингу' },
    ];

    return (
        <>
            <Select onUpdate={(newValue) => {
                        dispatch(setSortType(newValue[0]));
                        dispatch(reloadData());}}
                    options={options}
                    label="Сортировать по "
                    placeholder="..." />
        </>
    );
};