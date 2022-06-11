import React, {useState, useRef, useEffect} from 'react'
import { validator } from '../../../shared/utility';
import axios from 'axios';
import { Input } from './Input/Input';
import {formData} from './formData';

const ContactForm = (props) => {

    const initialForm = formData;
    const [form, setForm] = useState(initialForm);
    const fieldArr = [];
    let fields;
    const [submitMessage, setSubmitMessage] = useState('');
    const [error, setError] = useState(false);
    const formRef = useRef(null);
    const [cfHeight, setCfHeight] = useState(0);
    const formContainerRef = useRef(null);

    // OnChange validation start
    const onChangeHandler = (e, type, required) => {
        // here run logic
        const newForm = {...form};
        
        newForm.formFields[e.target.name].touched = true;
        // update isValid for the field
        newForm.formFields[e.target.name].isValid = validator(e.target.value, type, required);

        // formIsValid logic, check all fields
        let formIsValid = true;
        for (let inputIdentifier in  newForm.formFields) {
            formIsValid = newForm.formFields[inputIdentifier].isValid && formIsValid;
            newForm.formIsValid = formIsValid;
        }
        setForm(newForm);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (form.formIsValid) {
            setSubmitMessage('');
            // submit form
            const formEl = formRef.current;
            axios({
                method: "post",
                url: "https://getform.io/f/b360c606-6925-4a31-bc6d-d8265ec32668",
                data: new FormData(formEl)
            })
            .then(res => {
               if (res.status === 200) {
                    setError(false);
                    setSubmitMessage('Form submitted succesfully. We will get in touch shortly!');
                    // reset form and state
                    formEl.reset();
                    setForm(initialForm);
                    setTimeout(() => {
                        setSubmitMessage('');
                    }, 3000);
               }
            })
            .catch(err => {
                if (err.response.status === 429) {
                    console.log(err);
                    setError(true);
                    setSubmitMessage('You can send new submissions once in every 60 seconds.');
                }
            });
        } else {
            // show errors
            const newForm = {...form};
            // update touched for each field and show errors
            for (let field in newForm.formFields) {
                newForm.formFields[field].touched = true;
            }
            setForm(newForm);
            // Show general error message
            setError(true);
            setSubmitMessage('Fix errors above before re-submitting the form!');
        }

    }

    // Collapse Contact Form End
    useEffect(() => {
        cfToggler();
    });

    const cfToggler = () => {
        if (props.active && formContainerRef.current) {
            setCfHeight(formContainerRef.current.scrollHeight);
        } else {
            setCfHeight(0);
        }
    }
    const dynamicHeight = cfHeight ? cfHeight + 'px' : '0px'; 
    // Collapse Contact Form End

    // render form fields
    for (let field in form.formFields) {
        fieldArr.push({
            id: field,
            fieldData: form.formFields[field]
        });
    }
    fields = fieldArr.map((el, i) => (
        <Input key={i} data={el} touched={el.fieldData.touched} invalid={!el.fieldData.isValid} changed={(event) => onChangeHandler(event, el.fieldData.type, el.fieldData.required)}/>
    ));

    return (
        <div className="row">
            <div className="col">
                <div className={`contact-form ${props.active ? 'open' : ''}`} id="getQuote" ref={formContainerRef} style={{height: dynamicHeight}}>
                    <div className="row"> 
                        <div className="col-xs-12 col-12 notice-col">
                            <div className="cf-notice">
                                If you were redirected to this page from Upwork, there's no need to ask for a quote via this contact form. Instead click on the <strong>Go back and HIRE me</strong> button, and you'll be redirected to the last page (UPWORK) you were on before coming here.
                            </div>
                        </div>
                    </div>
                    <form method="POST" ref={formRef}>
                        <div className="row">
                            {fields}
                            <span className='obligatory'>* Required Fields</span>
                            <div className="col-xs-12 col-12 form-el">
                                <button className="submit-btn" onClick={(e) => submitHandler(e)}>Send</button>
                            </div>
                            {submitMessage ? <span className={`message-box ${error ? 'error' : ''}`}>{submitMessage}</span> : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) 
};

export default ContactForm;