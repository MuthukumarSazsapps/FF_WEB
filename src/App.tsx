import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { actions, dispatch } from 'store';
import { ThemeProvider } from 'next-themes';
import GlobalDrawer from 'common/GlobalDrawer';
import GlobalModal from 'common/GlobalModal';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainRouter from 'routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DndProvider backend={HTML5Backend}>
          <Provider store={store}>
            <MainRouter />
            <Toaster />
            <GlobalDrawer />
            <GlobalModal />
          </Provider>
        </DndProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
