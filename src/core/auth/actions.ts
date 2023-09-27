import React from 'react';
import jwtDecode from 'jwt-decode';
import { ActionType, AuthAction } from './reducer';
import { 
    TOKEN_KEY, 
    REFRESH_KEY, 
    DEFAULT_ERROR_MESSAGE,
    TOKEN_TTL,
    Data,
    Result,
    REFRESH_TTL,
    APIRoute, 
    mutateAPI 
} from '../../core';
import { AccessLevel } from './reducer';

type AuthActionProps = {
    dispatch : React.Dispatch<AuthAction>;
    payload? : Data;
};

type AccessToken = {
    access : string;
    refresh : string;
};

export const authenticate = async ({ dispatch, payload } : AuthActionProps, method : APIRoute = APIRoute.AUTH) : Promise<Result<Data>> =>
{
    const {
        success,
        reply
    } = await mutateAPI<AccessToken>(method, payload);

    if (success && reply && reply.access)
    {
        const { access, refresh } = reply;
        const { level, uuid, username } = jwtDecode(access) as { level : AccessLevel; uuid : string; username : string; };

        localStorage.setItem(TOKEN_KEY, access);
        localStorage.setItem(REFRESH_KEY, refresh);

        dispatch({
            type : ActionType.LOGIN_SUCCESS,
            payload : { token : access, uuid, username, level }
        });

        return {
            success : true
        };
    }

    dispatch({ type: ActionType.LOGIN_ERROR, error : DEFAULT_ERROR_MESSAGE });

    return {
        success : false,
        error : 'Authentication Failed'
    };
};

export const logout = async ({ dispatch, payload } : AuthActionProps) : Promise<void> =>
{
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(TOKEN_KEY);

    dispatch({ type: ActionType.LOGOUT, payload });
};

export const verifyToken = async ({ dispatch } : AuthActionProps) : Promise<boolean> => 
{
    const token = localStorage.getItem(TOKEN_KEY);

    if (token)
    {
        const { iat, level, uuid, username } = jwtDecode(token) as { iat : number; level : AccessLevel; uuid : string; username : string; };
        const secondsSinceEpoch = Date.now() / 1000;
        const hasTokenExpired = secondsSinceEpoch - iat > TOKEN_TTL; 

        if (!hasTokenExpired)
        {
            dispatch({
                type : ActionType.LOGIN_SUCCESS,
                payload : { token, uuid, username, level }
            });

            return true;
        }
        else
        {
            return await verifyRefresh({ dispatch });
        }
    }

    return false;
};

export const verifyRefresh = async ({ dispatch } : AuthActionProps) : Promise<boolean> => 
{
    const refresh = localStorage.getItem(REFRESH_KEY);

    if (refresh)
    {
        const { iat } = jwtDecode(refresh) as { iat : number; };
        const secondsSinceEpoch = Date.now() / 1000;
        const hasTokenExpired = secondsSinceEpoch - iat > REFRESH_TTL; 

        if (!hasTokenExpired)
        {
            await authenticate({ dispatch, payload: { refresh } }, APIRoute.REFRESH)

            return true;
        }
    }

    return false;
};