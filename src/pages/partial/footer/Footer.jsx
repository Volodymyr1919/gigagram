import React from 'react';
// eslint-disable-next-line no-unused-vars
import footerStyle from './footer.scss'

function Footer(props) {
    return (
        <footer className='footer'>
            <div className='links'>
                <li>More about creators</li>
                <li>Tel-Ran</li>
                <li>Skilldesk</li>
                <li>LinkedIn</li>
            </div>
           <p>Copyright © 2023</p>
        </footer>
    );
}

export default Footer;