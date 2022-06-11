import React, { useState } from 'react';
import { navigate } from '@gatsbyjs/reach-router'

import ContactForm from './ContactForm/ContactForm';

const MoreInfo = () => {
    const [toggleForm, setToggleForm] = useState(false);

    const goBackHandler = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <div id="quote" className="choices">
            <div className="row">
                <div className="col-xs-12 col-12">
                    <div className="info">
                        <h1>More Information</h1>
                        <span className="divider"></span>
                        <p> Click <strong>Get a QUOTE</strong> to get extra information on any of the projects above, or to discuss/get a quote for any project you would like to. </p>
                    </div>
                </div>
            </div>
            <div className="info-btns">
                <button className="btn website-link back-btn" onClick={goBackHandler}>Go back and HIRE me!</button>
                <button className="btn more-info" onClick={() => {setToggleForm(!toggleForm)}}>Get a QUOTE</button>
            </div>
            <ContactForm active={toggleForm}/>
        </div>
    );
};

export default MoreInfo;