import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './src/router/AppRouter';
import {Provider} from 'react-redux';
import { store } from './src/store/store';



export const AdminApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}
