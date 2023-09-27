import React from 'react';
import { StaticContext } from 'react-router';
import { 
    Route as ReactRoute, 
    Redirect, 
    RouteComponentProps, 
} from 'react-router-dom';
import { RouteProps } from './Route';

interface PrivateRouteProps extends RouteProps
{
    authorized : boolean;
    redirect?  : string;
}

type RenderProps = RouteComponentProps<{ [x: string]: string | undefined; }, StaticContext, unknown>;

export const PrivateRoute : React.FunctionComponent<PrivateRouteProps> = ({ 
    authorized,
    redirect,
    component : Component = () => (<></>),
    ...rest 
}) =>
{
    
    const render = (props :  RenderProps) =>
        (
            authorized ? (
                <Component {...props} {...rest} />
            ) : (
                <Redirect to={redirect ?? '/'} />
            )
        );

    return <ReactRoute render={render} />;
};