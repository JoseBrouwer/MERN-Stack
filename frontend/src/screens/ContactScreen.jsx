import React, { useState } from 'react';

const ContactScreen = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message) {
      alert('Please fill in all fields');
      return;
    }
  
    const emailContent = {
      subject: subject,
      message: message,
      email: 'theemernshop@example.com' 
      // password for email: theemernshop1!
    };
    console.log(emailContent);  
    alert('Email sent successfully!');
    
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactScreen;

