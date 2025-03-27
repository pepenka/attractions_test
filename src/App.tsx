import ControlPanel from "./components/controlPanel.tsx";
import styled from "styled-components";
import AttractionComponent from "./components/attraction.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import {AddButton} from "./components/addAttractionComponent.tsx";
import ModalWindow from "./components/modalWindow.tsx";

const AppContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 20px;
    padding: 10px;
`

const Main = styled.main`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const AttractionCount = styled.span`
    font-size: 22px;
`

function App() {
    const attractions = useSelector((state: RootState) => state.app.attractions);

    return (
        <AppContentContainer>
            <ControlPanel />
            <AttractionCount>Всего достопримечательностей: {attractions.length}</AttractionCount>
            <AddButton />
            <ModalWindow />
            <Main>
                {attractions.map((item, index) =>
                    (<AttractionComponent {...item} key={index} />))}
            </Main>
        </AppContentContainer>
    )
}

export default App
