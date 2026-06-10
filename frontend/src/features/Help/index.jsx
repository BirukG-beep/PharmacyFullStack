import React, { useState } from 'react';
import { useTheme } from "../../hooks/useTheme";
const GetTechHelp = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const theme = useTheme();

  return (
    <div className="get-tech-help" style={{backgroundColor: theme.backgroundColor, maxWidth:"100%", height:"89vh" , boxSizing:"border-box", padding:"0" , margin:"0" , display:"flex" , alignItems:"center", justifyContent:"center" }}>
    
      
      <section className="help-options">
      <h1  style={{margin:"0" , color:theme.textColor}}>Get Tech Help</h1>
        <ul>
          <li>
            <button onClick={() => window.open('https://www.example.com/faq', '_blank')}>
              View FAQs
            </button>
          </li>
          <li>
            <button onClick={() => window.open('https://www.example.com/support', '_blank')}>
              Visit Support Center
            </button>
          </li>
          <li>
            <button onClick={toggleContactForm}>
              Contact Us
            </button>
          </li>
        </ul>
      </section>

      {showContactForm && (
        <section className="contact-form" style={{    backdropFilter:"blur(20px)"}}>
         
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
              alert('Message sent! We will get back to you soon.');
            }}
          >
             <h2 style={{color:theme.textColor , margin:"0"}}>Contact Us</h2>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Message:
              <textarea name="message" rows="4" required></textarea>
            </label>
            <button type="submit">Send Message</button>
            <button type="button" onClick={toggleContactForm}>
              Cancel
            </button>
          </form>
        </section>
      )}

      <style jsx>{`
      
        .contact-form{
        position:absolute;
        top:0;
        bottom:0;
        right:0;
        left:0;
        z-index:99909;
        }
        .help-options ul {
          list-style-type: none;
          padding: 0;
        }
        .help-options li {
          margin-bottom: 10px;
        }
        .help-options button {
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        .contact-form {
          padding: 10px;
          border-top: 1px solid #ddd;
          display:flex;
          justify-content:center;
          align-items:center;
        }
        .contact-form form {
        max-width:300px;
          display: flex;
          flex-direction: column;
          background-color:#1d242e;
          padding:10px;
          border-radius:10px;
        }
        .contact-form label {
          margin-bottom: 10px;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .contact-form button {
          margin-top: 10px;
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default GetTechHelp;
