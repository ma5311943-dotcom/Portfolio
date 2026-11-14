"use client";
import React, { useState } from 'react';
import './Contact.css';
import LetterReveal from "../LetterReveal/LetterReveal";
import Reveal from "../Reveal/Reveal";
import Magnetic from "../Magnetic/Magnetic";

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
            <Reveal className="contact-title" from="down">
                <LetterReveal as="h1" text="Get in Touch" />
                <img src="/theme_pattern.svg" alt="pattern" />
            </Reveal>

            <div className="contact-section">
                <Reveal className="contact-left" from="left">
                    <LetterReveal as="h1" text="Let's Talk" />
                    <p>I am currently available to take on new projects, so feel free to drop a message.</p>

                    <div className="contact-details">
                        <div className="contact-detail">
                            <img src="/mail_icon.svg" alt="email" />
                            <p>ilyas5803689@gmail.com</p>
                        </div>
                        <div className="contact-detail">
                            <img src="/location_icon.svg" alt="location" />
                            <p>Islamabad, Pakistan</p>
                        </div>
                        <div className="contact-detail">
                            <img src="/call_icon.svg" alt="phone" />
                            <p>+92 319 580 3689</p>
                        </div>
                    </div>
                </Reveal>

                <Reveal as="form" className="contact-form" from="right" onSubmit={onSubmit}>
                    <input type="hidden" name="from_name" value="Portfolio Website" />
                    <input type="hidden" name="subject" value="New message from portfolio" />
                    <input type="hidden" name="email" value="ilyas5803689@gmail.com" />

                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="user_email" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
                    <Magnetic className="contact-submit-magnetic">
                        <button type="submit" data-cursor-label="SEND">Send Message</button>
                    </Magnetic>
                    <span>{result}</span>
                </Reveal>
            </div>
        </div>
    );
};

export default Contact;
