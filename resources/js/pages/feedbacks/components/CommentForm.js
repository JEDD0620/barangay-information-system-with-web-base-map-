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
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Form.Control
                id={type == 'comment' ? type : type + id}
                as="textarea"
                placeholder={`Leave a ${type} here ...`}
                onChange={(e) => setBody(e.target.value)}
            />
            <span className='float-right mt-2'>
                <Button variant='primary' onClick={onSubmit}>Submit</Button>
            </span>
        </>
    )
}