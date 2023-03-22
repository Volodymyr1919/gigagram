import React from 'react';
import footerStyle from '../scss/footer.scss'

function Footer(props) {
    return (
        <div className='footer'>
        <div className='footer_links'>
                <ul>
                    
                    {/* <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 2</a></li>
                    <li><a href="#">Link 3</a></li> */}
                    
                </ul>
            <button>more about us</button>  
        </div> 
        <p>since 2023</p>
        </div>
    );
}

export default Footer;