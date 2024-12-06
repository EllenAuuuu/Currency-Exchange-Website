import React from "react";
import {FaFacebook, FaGithub, FaHome, FaInstagram, FaMailBulk, FaPhone, FaTwitter} from "react-icons/fa"
import"../styles/FooterStyle.css"

export default function Footer(){
    return(
        <div className="footer">
            <div className="footer-container">
                <div className="left">
                    <div className="location">
                        <FaHome size={20} style={{color:"#fff",marginRight:"2rem"}}/>
                        <div>
                            <p>Gardens Point campus.</p>
                            <p>2 George St Brisbane, QLD 4000</p>
                        </div>
                    </div>
                    <div className="phone">
                        <p><FaPhone size={20} style={{color:"#fff",marginRight:"2rem"}}/>(07)3138-2000</p>
                    </div>
                    <div className="email">
                        <p><FaMailBulk size={20} style={{color:"#fff",marginRight:"2rem"}}/>media@qut.edu.au</p>
                    </div>
                </div>
                <div className="right">
                    <h4>About the website</h4>
                    <p>This is a Live Exchange Rate website. 
                        The website also offers Currency Converter Calculator. </p>
                </div>                         
            </div>
            <div className="socialMediaContainer">
                <div className="socialMedia">
                    <a href="https://www.facebook.com/your-facebook-profile">
                    <FaFacebook size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a>
                    <a href="https://www.instagram.com/your-instagram-profile">
                    <FaInstagram size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a>
                    <a href="https://www.twitter.com/your-twitter-profile">
                    <FaTwitter size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a>
                    <a href="https://www.github.com/your-github-profile">
                    <FaGithub size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a>
                </div>
            </div>
            <div className="copyright"><p>Copyright ©2023</p></div>
        </div>
    )
}