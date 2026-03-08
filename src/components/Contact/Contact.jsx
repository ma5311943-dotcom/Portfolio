import React, { useState } from 'react';
import './Contact.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';

const Contact = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");
        const formData = new FormData(event.target);
        formData.append("access_key", "cf15b906-140d-4f4a-847c-f62742959036");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Message sent successfully ✅");
            event.target.reset();
        } else {
            setResult("Something went wrong ❌");
            console.log(data);
        }
    };

    return (
        <div id='contact' className="contact">
            <div className="contact-title" data-aos="fade-down">
                <h1>Get in Touch</h1>
                <img src={theme_pattern} alt="pattern" />
            </div>

            <div className="contact-section">
                <div className="contact-left" data-aos="fade-right">
                    <h1>Let's Talk</h1>
                    <p>I am currently available to take on new projects, so feel free to drop a message.</p>

                    <div className="contact-details">
                        <div className="contact-detail">
                            <img src={mail_icon} alt="email" />
                            <p>ilyas5803689@gmail.com</p>
                        </div>
                        <div className="contact-detail">
                            <img src={location_icon} alt="location" />
                            <p>Islamabad, Pakistan</p>
                        </div>
                        <div className="contact-detail">
                            <img src={call_icon} alt="phone" />
                            <p>+92 319 580 3689</p>
                        </div>
                    </div>
                </div>

                <form className="contact-form" onSubmit={onSubmit} data-aos="fade-left">
                    <input type="hidden" name="from_name" value="Portfolio Website" />
                    <input type="hidden" name="subject" value="New message from portfolio" />
                    <input type="hidden" name="email" value="ilyas5803689@gmail.com" />

                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="user_email" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
                    <button type="submit">Send Message</button>
                    <span>{result}</span>
                </form>
            </div>
        </div>
    );
};

export default Contact;
