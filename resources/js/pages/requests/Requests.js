import React from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

const Requests = () => {

    return (
        <Layout>
            <div>
                Request
            </div>
        </Layout>
    );
}

if (document.querySelector('#requests')) {
    ReactDOM.render(<Requests />, document.querySelector('#requests'));
}
