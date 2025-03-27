import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAttractions} from "../json-server/api.ts";
import {actions, Attraction, ModalWindowDataInfo} from "../types.ts";

interface AppState {
    isAdmin: boolean;
    attractions: Attraction[];
    openModal: boolean;
    modalWindowDataInfo: ModalWindowDataInfo;
    attractionActionName: string;
    showVisited: boolean;
    sortType: string;
    searchType: string;
    searchValue: string;
}

const initialState: AppState = {
    isAdmin: false,
    attractions: await fetchAttractions(),
    openModal: false,
    modalWindowDataInfo: {attraction: null, action: actions.post},
    attractionActionName: 'Создание',
    showVisited: true,
    sortType: "none",
    searchType: 'none',
    searchValue: '',
};

export const reloadData = createAsyncThunk(
    'attractions/fetchAttractions',
    async () => {
        return await fetchAttractions();
    }
);

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        swapAdminState: state => {
            state.isAdmin = !state.isAdmin;
        },
        swapOpenModal: state => {
            state.openModal = !state.openModal;
        },
        setModalWindowDataInfo: (state, action) => {
            state.modalWindowDataInfo = action.payload;
        },
        setAttractionActionName: (state, action) => {
            state.attractionActionName = action.payload;
        },
        swapShowVisitedState: (state) => {
            state.showVisited = !state.showVisited;
        },
        setSortType: (state, action) => {
            state.sortType = action.payload;
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(reloadData.fulfilled, (state, action) => {
            let newData = action.payload;
            switch (state.sortType) {
                case "none":
                    break;
                case "date":
                    newData.sort((a: Attraction, b: Attraction) => {
                        return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
                    });
                    break;
                case "rating":
                    newData.sort((a: Attraction, b: Attraction) => {
                        return b.rating - a.rating;
                    });
                    break;
            }

            if(!state.showVisited) {
                newData = newData.filter(e => !e.status);
            }
            console.log(state.searchValue);
            if(state.searchValue.length > 0) {
                switch (state.searchType) {
                    case "none":
                        break;
                    case "name":
                        newData = newData.filter(e => e.name.includes(state.searchValue));
                        break;
                    case "description":
                        newData = newData.filter(e => e.description.includes(state.searchValue));
                        break;
                    case "place":
                        console.log('сортировка по месту  ', state.searchValue, newData);
                        newData = newData.filter(e => e.place.includes(state.searchValue));
                        break;
                }
            }

            state.attractions = newData;
        });
    }
});

export const {
    swapAdminState,
    swapOpenModal,
    setModalWindowDataInfo,
    setAttractionActionName,
    swapShowVisitedState,
    setSortType,
    setSearchType,
    setSearchValue} = appSlice.actions;
export default appSlice.reducer;