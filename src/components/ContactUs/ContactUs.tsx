"use client";

import React, { useState } from 'react';
import styles from './ContactUs.module.css';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    privacyPolicy: false
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section className={styles.contactUs} id="contact">
      <div className={styles.container}>
        <div className={styles.subtitle}>Reach Out to Us</div>
        <h2 className={styles.title}>We're Here to Help</h2>
        <p className={styles.description}>
          Please fill out the form below, and we will get back to you soon.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                First Name
                <span className={styles.required}> *</span>
              </label>
              <input
                type="text"
                name="firstName"
                className={styles.input}
                placeholder="Your First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Last Name
                <span className={styles.required}> *</span>
              </label>
              <input
                type="text"
                name="lastName"
                className={styles.input}
                placeholder="Your Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Email Address
              <span className={styles.required}> *</span>
            </label>
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Contact Number
              <span className={styles.required}> *</span>
            </label>
            <input
              type="tel"
              name="phone"
              className={styles.input}
              placeholder="+123 456 7890"
              value={formData.phone}
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

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs; 