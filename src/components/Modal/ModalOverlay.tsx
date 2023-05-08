import { FC } from "react";
import styled from "@emotion/styled";
import MessageModal from "./MessageModal";

const ModalWrapper = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.5;
    display; flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
`;
const ModalContainer = styled.div`
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 450px;
    height: max-content;
    background-color: white;
    position: fixed;
    z-index: 6;
`;

const ModalBody = styled.div`
    padding: 12px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    height: max-content;
`;

const ModalHeader = styled.div`
    padding: 12px 12px 12px 36px;
    height: max-content;
    display: flex;
`;
const ModalFooter = styled.div`
    padding: 12px 36px 12px 36px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    height: max-content;
`;

const ModalTitle = styled.h2`
    padding: 0;
    margin: 0;
`;
interface ModalOverlayInterface {
    title: string;
    actionPrompt: string;
    onCancel: any;
    onAction: any;
}

const ModalOverlay: FC<ModalOverlayInterface> = ({
    title,
    actionPrompt,
    onAction,
    onCancel
}) => {
    return (
        <>
            <ModalWrapper></ModalWrapper>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                </ModalHeader>
                <ModalBody>{actionPrompt}</ModalBody>
                <ModalFooter>
                    <button onClick={onAction}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </ModalFooter>
            </ModalContainer>
        </>
    );
};

export default ModalOverlay;
