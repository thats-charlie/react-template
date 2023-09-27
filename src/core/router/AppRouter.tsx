import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Route, { RouteProps, AccessType } from './Route';
import { Dashboard, Home, Login } from '../../view/pages';
import { useAuthToken } from '../../view/hooks';
import { AccessLevel } from '../../core/auth';

export enum RoutePath
{
    ROOT = '/',
    LOGIN = '/login',
    DASHBOARD = '/dashboard'
}

const routes : Array<RouteProps> = [
    {
        path : RoutePath.ROOT,
        access : AccessType.PUBLIC,
        component : Home,
        exact : true
    },
    {
        path : RoutePath.LOGIN,
        access : AccessType.PUBLIC,
        component : Login,
        exact : true
    },
    {
        path : RoutePath.DASHBOARD,
        access : AccessType.PRIVATE,
        accessLevel : AccessLevel.USER,
        component : Dashboard,
        exact: true
    }
];

const AppRouter : React.FunctionComponent = () => 
{
    const [ loading, authorized, level ] = useAuthToken();

    return (
        <BrowserRouter>
            <Switch>
                {
                    routes.map(({ path, access, component, ...props }: RouteProps) => 
                    {
                        return (
                            <Route 
                                key={path}
                                path={path}
                                access={access}
                                component={component}
                                userAccess={level}
                                {
                                    ...props
                                }
                            />
                        );
                    })
                }
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;