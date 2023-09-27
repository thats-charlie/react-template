import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Page, TextInput, Button } from '../../components';
import { authenticate, useAuthorizationDispatch } from '../../../core';
import { useHistory } from 'react-router';
import { COLORS } from '../../../assets';


export const Login : React.FunctionComponent = () => {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ error, setError ] = useState<string>(); 
    const dispatch = useAuthorizationDispatch();
    const history = useHistory();

    const submit = async () => {
        const { success, error } = await authenticate({ dispatch, payload: { email, password } });
        if (success) {
            history.push('/dashboard')
        }
        else if (error)
        {
            setError(error);
        }
    }

    return (
        <Page>
            <Title>
                Login
            </Title>
            <Container>
                <TextInput 
                    onChange={setEmail}
                    placeholder={'Email'}
                />
                <TextInput 
                    onChange={setPassword}
                    placeholder={'Password'}
                    type='password'
                />
                <Button 
                    onClick={submit}
                    label='Login'
                />
                {error && <Error>{error}</Error>}
            </Container>
        </Page>
    );
}

const Title = styled.span`
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 4rem;
    color: #DDDDDD
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 15rem;
    justify-content: space-around;
    flex-direction: column;
`;

const Error = styled.span`
    font-size: 0.75rem;
    color: ${COLORS.error};
    text-align: center;
    margin: 0.5rem;
`;