import React from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

const Dashboard = () => {

    return (
        <Layout>
            <div>
                dashboard
            </div>
        </Layout>
    );
}

if (document.querySelector('#dashboard')) {
    ReactDOM.render(<Dashboard />, document.querySelector('#dashboard'));
}
