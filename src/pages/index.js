import React from "react";
import { graphql } from "gatsby";

import '../../src/style.scss';

import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer';
import MoreInfo from '../components/MoreInfo/MoreInfo';
import PortfolioItems from "../components/Portfolio/PortfolioItems";

const IndexPage = ({ data }) => {
  const options = data.allWpPage.nodes[0].themeOptions;
  const portfolioInfo = data.wpPage.portfolio.portfolio;

  return (
    <>
      <Header data={options}/>
      <main className="section main-content">
        <div className="container portfolio-container">
          <PortfolioItems data={portfolioInfo} />
          <MoreInfo />
        </div>
      </main>
      <Footer data={options} />
    </>
  );
};

export const query = graphql`
  query AcfInfo {
    wpPage(isFrontPage: {eq: true}) {
      id
      portfolio {
        portfolio {
          description
          title
          websiteUrl
          featuredImage {
            altText
            sourceUrl
            id
            localFile {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                )
              }
            }
          }
          contentImage {
            altText
            sourceUrl
            id
            localFile {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
    allWpPage(filter: {slug: {eq: "options"}}) {
      nodes {
        themeOptions {
          copyright
          logo {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: NONE)
              }
            }
          }
        }
      }
    }
  }
`;


export default IndexPage;
