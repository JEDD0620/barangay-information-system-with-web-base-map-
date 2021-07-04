import React from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

const Schedules = () => {

    return (
        <Layout>
            <div>
                Schedules
            </div>
        </Layout>
    );
}

if (document.querySelector('#schedules')) {
    ReactDOM.render(<Schedules />, document.querySelector('#schedules'));
}
