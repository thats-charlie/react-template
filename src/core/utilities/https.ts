import { DEFAULT_ERROR_MESSAGE } from "./constants";
import { Data } from "./data";

export enum HTTPMethod
{
    GET    = 'GET',
    PUT    = 'PUT',
    POST   = 'POST',
    PATCH  = 'PATCH',
    HEAD   = 'HEAD',
    DELETE = 'DELETE'
}

export interface Result<T>
{
    success : boolean;
    reply?  : T;
    error?  : string;
}


export const query = async <T>(
    url  : string, 
    headers : Data = {}, 
    qs?  : string
) : Promise<Result<T>> =>
{
    const options = {
        method : HTTPMethod.GET,
        headers : {
            'Content-Type' : 'application/json',
            ...headers
        }
    };

    try
    {
        let endpoint = url;
        if (qs) endpoint = `${endpoint}${qs}`;

        const response = await fetch(endpoint, options);
        if (response.status === 401)
        {
            return {
                success : false,
                error : 'Your session has expired, please reauthenticate.'
            };
        }

        const reply = await response.json();

        return {
            success : true,
            reply
        };
    }
    catch (error)
    {
        return {
            success : false,
            error   : DEFAULT_ERROR_MESSAGE
        };
    }
};


export const mutate = async <T>(
    url : string, 
    payload : Data = {}, 
    headers : Data = {}, 
    method : HTTPMethod = HTTPMethod.POST,
    qs? : string
) : Promise<Result<T>> =>
{
    const options = {
        method,
        headers : {
            'Content-Type' : 'application/json',
            ...headers
        },
        body : JSON.stringify(payload)
    };

    try
    {
        let endpoint = url;
        if (qs) endpoint = `${endpoint}${qs}`;
        const response = await fetch(endpoint, options);

        if(response.status === 204) 
        {
            return {
                success : true,
                reply: undefined
            };
        }

        if (response.status === 401)
        {
            return {
                success : false,
                error : 'Your session has expired, please reauthenticate.'
            };
        }

        let reply : T | undefined;
        let error : string | undefined;
        try 
        {
            reply = await response.json();
        } 
        catch(e)
        {
            error = e as string;
        }
        return {
            success : response.status === 200,
            reply,
            error
        };
    }
    catch (error)
    {
        return {
            success : false,
            error   : DEFAULT_ERROR_MESSAGE
        };
    }
};