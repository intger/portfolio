import React from 'react';

const MenuItem = (props) => {
    return <li className={`nav-item ${props.extraClass.join(' ')}`}><a href={props.link} className="nav-link">{props.title}</a></li>;
}

export default MenuItem;    