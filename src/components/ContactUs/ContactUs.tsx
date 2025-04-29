"use client";

import React, { useState, useEffect } from 'react';
import styles from './ContactUs.module.css';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("dLX5rKssaDknwe6tr");

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: '',
    privacyPolicy: false
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      privacyPolicy: e.target.checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const templateParams = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      user_phone: formData.user_phone,
      message: formData.message
    };

    try {
      const response = await emailjs.send(
        "service_qqxvxwp", // Service ID
        "template_4zpm2yt", // Template ID
        templateParams
      );

      console.log("SUCCESS!", response.status, response.text);
      
      setStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      });

      setFormData({
        user_name: '',
        user_email: '',
        user_phone: '',
        message: '',
        privacyPolicy: false
      });

    } catch (error) {
      console.log("FAILED...", error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactUs} id="contact">
      <div className={styles.container}>
        <div className={styles.subtitle}>Reach Out to Us</div>
        <h2 className={styles.title}>We're Here to Help</h2>
        <p className={styles.description}>
          We don't offer fixed packages — every quote is tailored to your campaign's scope, complexity, and creative needs.
        </p>

        {status.type && (
          <div className={`${styles.alert} ${styles[status.type]}`}>
            {status.message}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Name
                <span className={styles.required}> *</span>
              </label>
              <input
                type="text"
                name="user_name"
                className={styles.input}
                placeholder="Your Name"
                value={formData.user_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email Address
                <span className={styles.required}> *</span>
              </label>
              <input
                type="email"
                name="user_email"
                className={styles.input}
                placeholder="Your Email"
                value={formData.user_email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Contact Number
              <span className={styles.required}> *</span>
            </label>
            <input
              type="tel"
              name="user_phone"
              className={styles.input}
              placeholder="+123 456 7890"
              value={formData.user_phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Your Message
              <span className={styles.required}> *</span>
            </label>
            <textarea
              name="message"
              className={styles.textarea}
              placeholder="Let us know how we can assist you"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="privacy"
              name="privacyPolicy"
              className={styles.checkboxInput}
              checked={formData.privacyPolicy}
              onChange={handleCheckbox}
              required
            />
            <label htmlFor="privacy" className={styles.checkboxLabel}>
              I agree to the <a href="/privacy" className={styles.privacyLink}>privacy policy</a>
            </label>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs; 