import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home'; 
import ConfigPage from './components/ConfigPage';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} /> 
        <Route path='/config-data' component={ConfigPage} />
    </Layout>
);
