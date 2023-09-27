import React from 'react';
import { styled } from 'styled-components';
import { Page } from '../../components';
import { Button } from '../../components';
import { useHistory } from 'react-router';


export const Home : React.FunctionComponent = () => {

    const history = useHistory();

    return (
        <Page>
            <Title>
                🚀 React Template 🌱
            </Title>
            <ButtonContainer>
                <Button 
                    onClick={() => history.push('/login')}
                    label='Login'
                />
            </ButtonContainer>
            
        </Page>
    );
}

const Title = styled.span`
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 6rem;
    color: #DDDDDD
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    width: 15rem;
    justify-content: space-around;
`;