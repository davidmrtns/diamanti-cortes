import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

/*export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    );
  }
}*/

const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        const { element, children, ...rest } = route;

        if (children) {
            return (
                <Route
                    key={index}
                    {...rest}
                    element={element}
                >
                    {renderRoutes(children)}
                </Route>
            );
        }

        return <Route key={index} {...rest} element={element} />;
    });
};

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    {renderRoutes(AppRoutes)}
                </Routes>
            </Layout>
        );
    }
}
