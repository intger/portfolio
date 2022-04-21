import React, {useState} from "react";

import PortfolioItem from "./PortfolioItem/PortfolioItem";

const PortfolioItems = ({data}) => {
    let projects;
    let firstLoadProjects;
  
    const [postNumber, setPostNumber] = useState(6);
  
    projects = data.map((project, index) => {
      return (
        <PortfolioItem
          key={index}
          index={index}
          title={project.title}
          imageData={project.featuredImage.localFile}
          alt={project.featuredImage.altText}
          contentImageData={project.contentImage.localFile}
          contentImageAlt={project.contentImage.altText}
          description={project.description}
          websiteUrl={project.websiteUrl}
        />
      );
    });
  
    const showPosts = (postNr) => {
      if (projects) {
        firstLoadProjects = projects.slice(0, postNr);
        return firstLoadProjects;
      }
    }

    return (
        <>
          <div className="row portfolio">{showPosts(postNumber)}</div>
          <div className="row">
            <div className="load-more-wrap">
              { postNumber === projects.length ? null : <button type="button" className="btn load-more-btn" onClick={() => {setPostNumber(postNumber + 3)}}>Load more <span></span><span></span><span></span><span></span></button> }
            </div>
          </div>
        </>
    );
}

export default PortfolioItems;