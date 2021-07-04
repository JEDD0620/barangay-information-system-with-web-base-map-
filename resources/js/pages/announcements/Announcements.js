import React from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

const Announcements = () => {

    return (
        <Layout>
            <div>
                Announcements
            </div>
        </Layout>
    );
}

if (document.querySelector('#announcements')) {
    ReactDOM.render(<Announcements />, document.querySelector('#announcements'));
}
