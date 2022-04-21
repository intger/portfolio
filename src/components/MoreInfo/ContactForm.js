import React, {useState, useRef, useEffect} from 'react'
import { validator, errorStrings } from '../../shared/utility';
import axios from 'axios';

const ContactForm = (props) => {

    const [form, setForm] = useState({
        formFields: {
            company: {
                validation: {
                    required: true,
                    isValid: false
                }
            },
            name: {
                validation: {
                    required: true,
                    isValid: false
                }
            },
            email: {
                validation: {
                    required: true,
                    isValid: false
                }
            },
            inquiry: {
                validation: {
                    required: true,
                    isValid: false
                }
            },
            message: {
                validation: {
                    required: false,
                    isValid: true
                }
            },
        },
        formIsValid: false
    });

    const [fieldValid, setFieldValid] = useState({
        company: true,
        name: true,
        email: true,
        inquiry: true,
        message: true
    });
    const [submitMessage, setSubmitMessage] = useState('');
    const [error, setError] = useState(false);
    const formRef = useRef(null);
    // Collapse Contact Form State vars
    const [cfHeight, setCfHeight] = useState(0);
    const formContainerRef = useRef(null);
    // Collapse Contact Form vars End
    const onChangeHandler = (e, type, required) => {
        const newForm = {...form};
        const newErrors = {...fieldValid};

        // update isValid for the field
        newForm.formFields[e.target.name].validation.isValid = validator(e.target.value, type, required);

        // update error state if field is not valid
        newErrors[e.target.name] = validator(e.target.value, type, required);
        setFieldValid(newErrors);

        // formIsValid logic, check all fields
        let formIsValid = true;
        for (let inputIdentifier in  newForm.formFields) {
            formIsValid = newForm.formFields[inputIdentifier].validation.isValid && formIsValid;
            newForm.formIsValid = formIsValid;
        }
        setForm(newForm);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // improve UX for request... error/success messages, loading animation
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
                    formEl.reset();
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
            const newErrors = {...fieldValid};
            // update invalid field for each field
            for (let field in form.formFields) {
                if (!form.formFields[field].validation.isValid) {
                    newErrors[field] = false;
                    setFieldValid(newErrors);
                }
            }
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
                            <div className={`col-xs-12 col-sm-6 col-md-6 form-el ${fieldValid['company'] ? '' : 'invalid'}`}>
                                <input type="text" name="company" placeholder="Company Name*" onBlur={(event) => onChangeHandler(event, 'text', form.formFields['company'].validation.required)} />
                                {!fieldValid['company'] && <span>{errorStrings('text')}</span>}
                            </div>
                            <div className={`col-xs-12 col-sm-6 col-md-6 form-el ${fieldValid['name'] ? '' : 'invalid'}`}>
                                <input type="text" name="name" placeholder="Full Name*" onBlur={(event) => onChangeHandler(event, 'text', form.formFields['name'].validation.required)} />
                                {!fieldValid['name'] && <span>{errorStrings('text')}</span>}
                            </div>
                            <div className={`col-xs-12 col-sm-6 col-md-6 form-el ${fieldValid['email'] ? '' : 'invalid'}`}>
                                <input type="email" name="email" placeholder="Email*" onBlur={(event) => onChangeHandler(event, 'email', form.formFields['email'].validation.required)} />
                                {!fieldValid['email'] && <span>{errorStrings('email')}</span>}
                            </div>
                            <div className={`col-xs-12 col-sm-6 col-md-6 form-el ${fieldValid['inquiry'] ? '' : 'invalid'}`}>
                                <select name="inquiry" onBlur={(event) => onChangeHandler(event, 'select', form.formFields['inquiry'].validation.required)}>
                                    <option hidden defaultValue value="">---*</option>
                                    <option value="custom-website">Custom-Website-Development</option>
                                    <option value="e-commerce">E-commerce Development</option>
                                    <option value="plugin-customization">Plugin Customization</option>
                                    <option value="theme-customization">Theme Customization</option>
                                </select>
                                {!fieldValid['inquiry'] && <span>{errorStrings('select')}</span>}
                            </div>
                            <div className={`col-xs-12 col-12 form-el ${fieldValid['message'] ? '' : 'invalid'}`}>
                                <textarea name="message" placeholder="Additional Information" onBlur={(event) => onChangeHandler(event, 'textarea', form.formFields['message'].validation.required)} />
                                {!fieldValid['message'] && <span>{errorStrings('text')}</span>}
                            </div>
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