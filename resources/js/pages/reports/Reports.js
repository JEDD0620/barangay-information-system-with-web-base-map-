import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Pendings } from './components/Pendings'
import { NotPendings } from './components/NotPendings'
import { OnGoing } from './components/OnGoing'

const Reports = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <Layout>
            <Pendings setToggle={setToggle} toggle={toggle} />
            <OnGoing setToggle={setToggle} toggle={toggle} />
            <NotPendings toggle={toggle} />
        </Layout>
    );
}

if (document.querySelector('#reports')) {
    ReactDOM.render(<Reports />, document.querySelector('#reports'));
}
