import Axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import React from 'react';

export const CommentForm = ({ id, type, update }) => {

    const [body, setBody] = useState();

    const onSubmit = () => {
        Axios.post(`/api/feedback/${id}/comment`, { body: body })
            .then(res => {
                update(true)
                setBody(null)
                document.querySelector('#' + (type == 'comment' ? type : type + id)).value = ''
            })
            .catch(err => console.log(err))
    }

    const handleChange = e => {
        setBody(e.target.value);

        e.target.style.height = "0px";
        let scrollHeight = e.target.scrollHeight + 16;
        e.target.style.height = scrollHeight + "px";

    };
    return (
        <>
            <Form.Control
                id={type == 'comment' ? type : type + id}
                as="textarea"
                placeholder={`Leave a ${type} here ...`}
                onChange={handleChange}
                required
                style={{
                    minHeight: '60px',
                    overflow: 'hidden'
                }}
            />
            <span className='float-right mt-2'>
                <Button variant='primary' onClick={onSubmit}>Submit</Button>
            </span>
        </>
    )
}