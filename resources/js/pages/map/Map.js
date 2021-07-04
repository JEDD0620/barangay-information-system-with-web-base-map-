import React from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

const Map = () => {

    return (
        <Layout>
            <div>
                Map
            </div>
        </Layout>
    );
}

if (document.querySelector('#map')) {
    ReactDOM.render(<Map />, document.querySelector('#map'));
}
