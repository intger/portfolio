import React, {useState} from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { navigate } from '@gatsbyjs/reach-router'

import Modal from 'react-bootstrap/Modal';

const PortfolioItem = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const scrollHandler = () => {
        handleClose();
        setTimeout(() => {
            navigate('/#quote');
        }, 300);
    }

    return (
        <div className="col-sm-12 col-md-6 col-lg-4 portfolio-item">
            <h4 className="overlay-title">{props.title}</h4>
            <span className="divider"></span> 
            <div className="image-box" role="button" onClick={handleShow} onKeyUp={handleShow}>
                <GatsbyImage image={getImage(props.imageData)}  alt={props.alt}/>
            </div>
            <Modal show={show} onHide={handleClose} className="portfolio-modal" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GatsbyImage image={getImage(props.contentImageData)}  alt={props.contentImageAlt}/>
                    <div dangerouslySetInnerHTML={{__html: props.description}}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn more-info" onClick={scrollHandler}>More Info</button>
                    <a href={props.websiteUrl} target="_blank" rel="noreferrer" className="btn website-link">Website URL</a>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PortfolioItem;