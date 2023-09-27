import { useState, useEffect } from 'react';
import { verifyToken } from '../../core/auth/actions';
import { AccessLevel, useAuthorizationDispatch } from '../../core/auth';
import { useSubscriber } from './useSubscriber';
import { TOKEN_KEY } from '../../core/utilities';

export const useAuthToken = () : [boolean, boolean, AccessLevel] =>
{
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ authorized, setAuthorized ] = useState<boolean>(false);
    const [ level, setLevel ] = useState<AccessLevel>(AccessLevel.UNAUTH);
    const dispatch = useAuthorizationDispatch();

    useSubscriber(TOKEN_KEY, ({ 
        detail : {
            authorizationStatus,
            level
        } 
    }) =>
    {
        setAuthorized(authorizationStatus);
        setLevel(level);
    });

    useEffect(() => 
    {
        let isMounted = true;
        (async () => 
        {
            const _authorized = await verifyToken({ dispatch });
            if (isMounted)
            {
                setLoading(false);
                setAuthorized(_authorized);
            }
        })();

        return () =>
        {
            isMounted = false;
        };
    }, []);

    return [
        loading,
        authorized,
        level
    ];
};