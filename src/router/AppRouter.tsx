//import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth/pages/LoginPage';
//import { useAuthStore } from '../hooks';
//import { useEffect } from 'react';

import { Layout } from '../ui/layouts/components/Layout';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';
import { LoadingSpinner } from '../ui/layouts/components/LoadingSpinner';
import { IngresoIndex } from '../ui/dashboard/ingresos/IngresoIndex';
import { CompraIndex } from '../ui/dashboard/compras/CompraIndex';
import { GastoIndex } from '../ui/dashboard/gastos/GastoIndex';
import { PlanillaIndex } from '../ui/dashboard/planillas/PlanillaIndex';



export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])


    if (status === 'checking') {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Navigate to="/ingresos" />} />
                                <Route path="/ingresos" element={<IngresoIndex />} />
                                <Route path="/compras" element={<CompraIndex />} />
                                <Route path="/gastos" element={<GastoIndex />} />
                                <Route path="/planillas" element={<PlanillaIndex />} />
                                <Route path="/*" element={<Navigate to="/ingresos" />} />
                            </Route>
                        </>
                    )
            }

        </Routes>
    )
}