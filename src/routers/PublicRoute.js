import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isAuthinticated, component: Component, ...rest}) => {
    return (
        <Route {...rest} component={(props) => {
            return (
                isAuthinticated ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <Component {...props} />
                )
            )
        }} />
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthinticated: !!state.auth.uid
    };
}

export default connect(mapStateToProps)(PublicRoute);