import { COLORS } from '../../assets';
import React from 'react';
import styled from 'styled-components';

interface Props {
    onClick    : () => void;
    label      : string;
    secondary? : boolean;
}

export const Button : React.FunctionComponent<Props> = ({
    onClick,
    label,
    secondary
}) => {
    return (
        <Container onClick={onClick} secondary={secondary}>
            <Label>{label}</Label>
        </Container>
    );
}


const Container = styled.div<{secondary?: boolean}>`
    width: 100%;
    min-width: 6rem;
    height: 3rem;
    background-color: ${props => props.secondary ? COLORS.secondary : COLORS.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 6px;
    margin: 0.5rem;
`;


const Label = styled.span`
    color: ${COLORS.accent};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.25rem;
`;