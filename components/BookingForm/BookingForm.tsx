"use client";
import React from "react";
import styles from "./BookingForm.module.css";

type Props = {
  onSubmit: (payload: { name: string; email: string; bookingDate: string; comments?: string }) => void;
  loading?: boolean;
};

const BookingForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bookingDate, setBookingDate] = React.useState("");
  const [comments, setComments] = React.useState("");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !bookingDate) {
      alert("Please fill required fields");
      return;
    }
    onSubmit({ name, email, bookingDate, comments });
  };

  return (
    <form className={styles.form} onSubmit={handle}>
      <input className={styles.form_input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input className={styles.form_input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className={styles.form_input} type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
      <textarea className={styles.form_input} value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Comments" rows={3} />
      <button type="submit" disabled={loading} className={styles.btn}>
        {loading ? "Booking..." : "Send"}
      </button>
    </form>
  );
};

export default BookingForm;