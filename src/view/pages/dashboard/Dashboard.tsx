import React from 'react';
import { styled } from 'styled-components';
import { Page } from '../../components';
import { useHistory } from 'react-router';


export const Dashboard : React.FunctionComponent = () => {

    return (
        <Page>
            <Title>
                Dashboard 🚁
            </Title>
        </Page>
    );
}

const Title = styled.span`
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 6rem;
    color: #DDDDDD
`;