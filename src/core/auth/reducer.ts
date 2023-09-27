import React from 'react';
import { usePublisher } from '../../view/hooks';
import { TOKEN_KEY } from '../../core/utilities';

export interface AuthState 
{
    token?    : string;
    uuid?     : string;
    username? : string;
    error?    : string;
    level?    : AccessLevel;
    isAuth    : boolean;
}

export enum AccessLevel
{
    UNAUTH      = 'UNAUTH',
    USER        = 'USER',
    ADMIN       = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum ActionType 
{
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGOUT        = 'LOGOUT',
    LOGIN_ERROR   = 'LOGIN_ERROR'
}


export interface AuthPayload
{
    token?    : string;
    uuid?     : string;
    username? : string;
    error?    : string;
    status?   : string;
    level?    : AccessLevel;
}

export interface AuthAction
{
    type     : ActionType;
    payload? : AuthPayload;
    error?   : string;
}

export interface Props 
{
    initialState : AuthState;
    action       : AuthAction;
}

export const initialState : AuthState = {
    token    : '',
    uuid     : '',
    username : '',
    level    : AccessLevel.UNAUTH,
    isAuth   : false,
    error    : undefined
};

export const AuthReducer: React.Reducer<AuthState, AuthAction> = (initialState, action) => 
{
    const authenticationPublisher = usePublisher(TOKEN_KEY);

    switch (action.type) 
    {
    case ActionType.LOGOUT:
        authenticationPublisher({
            transition : {
                message : action.payload?.error ?? 'Successfully logged out',
                status : action.payload?.status ?? 'success'
            },
            authorizationStatus: false,
            level: AccessLevel.UNAUTH
        });
        return {
            isAuth : false
        };

    case ActionType.LOGIN_ERROR:
        authenticationPublisher({
            transition : {
                message : action.payload?.error ?? 'Successfully logged out',
                status : action.payload?.status ?? 'success'
            },
            authorizationStatus: false,
            level: AccessLevel.UNAUTH
        });
        return {
            isAuth : false,
            error : action.error
        };

    case ActionType.LOGIN_SUCCESS:
        authenticationPublisher({
            transition : {
                message : `Successfully logged in as ${action.payload?.username}`,
                status : 'success',
            },
            authorizationStatus: true,
            level : action.payload?.level
        });
        return {
            token    : action.payload?.token,
            username : action.payload?.username,
            uuid     : action.payload?.uuid,
            level    : action.payload?.level,
            isAuth   : true,
            error    : undefined,
        };
    }
};