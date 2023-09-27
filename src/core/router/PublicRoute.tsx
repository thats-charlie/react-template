import React from 'react';
import { StaticContext } from 'react-router';
import { 
    Route as ReactRoute,
    RouteComponentProps, 
} from 'react-router-dom';
import { RouteProps } from './Route';

type RenderProps = RouteComponentProps<{ [ key : string ]: string | undefined; }, StaticContext, unknown>;

export const PublicRoute : React.FunctionComponent<RouteProps> = ({ 
    component : Component = () => (<></>),
    ...rest 
}) =>
{
    const render = (props : RenderProps) =>
        (
            <Component {...props} {...rest} />
        );

    return <ReactRoute render={render} />;
};