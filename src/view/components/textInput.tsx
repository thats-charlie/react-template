import { COLORS } from '../../assets';
import React from 'react';
import styled from 'styled-components';

interface Props {
    type?: 'text' | 'password';
    maxLength?: number;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder: string;
}

export const TextInput : React.FunctionComponent<Props> = ({
    type = 'text',
    maxLength = 50,
    onChange,
    onBlur,
    placeholder
}) => {
    return (
        <Input
            type={type}
            maxLength={maxLength}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
        />
    );
}
const Input = styled.input`
    border: none;
    background-color: transparent;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    border: 1px ${COLORS.secondary} solid;
    border-radius: 5px;
    margin: 1rem 0rem;
    height: 1.5rem;
    padding: 0.5rem;
    outline: none;
    color: white;
    :focus {
        border: 1px ${COLORS.secondary} solid;
        border-radius: 5px;
    }
`;