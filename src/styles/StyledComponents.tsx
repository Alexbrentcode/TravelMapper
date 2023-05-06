import styled from "@emotion/styled";
/**
 * Containers
 */

export const MapPageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: end;
`;

export const SidePanelCustom = styled.div`
    width: 480px;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 5;
    background-color: white;
`;

export const SearchButtonCustom = styled.button`
    height: 50px;
    width: 50px;
    background-color: #eeeeee;
`;

export const TextFieldCustom = styled.div`
    height: 50px;
    width: 200px;
`;
