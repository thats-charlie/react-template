import React from 'react';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AccessLevel } from 'core/auth';

export enum AccessType
{
    PUBLIC      = 'PUBLIC',
    PRIVATE     = 'PRIVATE'
}

export interface RouteProps
{
    path              : string;
    access            : AccessType;
    exact?            : boolean;
    component         : React.FunctionComponent;
    accessLevel?      : AccessLevel;
    redirect?         : string;
}

const Route : React.FunctionComponent<RouteProps & { userAccess : AccessLevel; }> = ({ 
    access, 
    accessLevel,
    userAccess, 
    component, 
    ...props 
}) =>
{
    switch (access)
    {
    case AccessType.PUBLIC:
        return <PublicRoute component={component} access={access} {...props} />;
    case AccessType.PRIVATE:
        return <PrivateRoute component={component}  access={access} {...props} authorized={userAccess === accessLevel} />;
    }
};

export default React.memo(Route);