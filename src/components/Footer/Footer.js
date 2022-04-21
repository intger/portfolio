import React from 'react';

const Footer = ({data}) => (
  <footer id="footer">
    <section className="section footer">
      <div className="copyright">
        <p>
          <span> © 2017 - { new Date().getFullYear() + ' ' + data.copyright }  </span> 
        </p>
      </div>
    </section>
  </footer>

);

export default Footer;