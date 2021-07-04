import React from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

const Reports = () => {

    return (
        <Layout>
            <div>
                Reports
            </div>
        </Layout>
    );
}

if (document.querySelector('#reports')) {
    ReactDOM.render(<Reports />, document.querySelector('#reports'));
}
