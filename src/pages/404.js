import React from "react";
import { graphql, Link } from "gatsby";

import '../../src/style.scss';

import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer';

const NotFoundPage = ({ data }) => {
  const options = data.allWpPage.nodes[0].themeOptions;

  return (
    <>
      <Header data={options}/>
      <main className="section main-content error-404">
        <div className="error-box">
            <h1>404</h1>
            <p>Whoops, you're probably lost there my friend. Why don't you head back to the homepage again and start over?</p>
            <Link className="back btn website-link" to="/">Back to Homepage</Link>
        </div>
      </main>
      <Footer data={options} />
    </>
  );
};

export const query = graphql`
query Options {
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

export default NotFoundPage;
