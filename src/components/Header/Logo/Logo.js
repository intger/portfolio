import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Logo = ({imageData}) => {
    return ( 
        <GatsbyImage image={getImage(imageData.localFile)} loading="eager" alt={imageData.altText}/>
    );
}

export default Logo;    