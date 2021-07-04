import React from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

const Feedbacks = () => {

    return (
        <Layout>
            <div>
                Feedbacks
            </div>
        </Layout>
    );
}

if (document.querySelector('#feedbacks')) {
    ReactDOM.render(<Feedbacks />, document.querySelector('#feedbacks'));
}
