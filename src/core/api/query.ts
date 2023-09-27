import { 
    BASE_URL,
    Data,
    Result,
    TOKEN_KEY,
    query
} from '../../core/utilities';

import { APIRoute } from '.';




export const queryAPI = async <T>(
    route   : APIRoute, 
    headers : Data = {}, 
    qs?  : string
) : Promise<Result<T>> =>
{
    const url = `${BASE_URL}${route}`;

    return await query<T>(url, headers, qs);
}


export const authenticatedQuery = async <T>(
    route   : APIRoute, 
    headers : Data = {}, 
    qs?  : string
) : Promise<Result<T>> =>
{
    const token = localStorage.getItem(TOKEN_KEY);

    if (token)
    {
        return await queryAPI<T>(
            route, 
            {
                ...headers,
                'Authorization' : `Bearer ${token}`
            }, 
            qs
        );
    }

    return {
        success : false
    };
};