import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CheckUserExpired } from 'utils/function';
export const PublicRoutes = () => {

    const location = useLocation();
    useEffect(() => {
        CheckUserExpired("public");
    },[location]);

    return <Outlet/>;
};