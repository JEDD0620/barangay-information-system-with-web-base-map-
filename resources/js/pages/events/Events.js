import React from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

const Events = () => {

    return (
        <Layout>
            <div>
                Events
            </div>
        </Layout>
    );
}

if (document.querySelector('#events')) {
    ReactDOM.render(<Events />, document.querySelector('#events'));
}
