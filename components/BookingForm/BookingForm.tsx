import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import type { FormikHelpers } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { format } from "date-fns";

import Calendar from "../Calendar/Calendar";
import css from "./BookingForm.module.css";

interface BookingFormValues {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}

const initialValues: BookingFormValues = {
  name: "",
  email: "",
  bookingDate: null,
  comment: "",
};

const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  bookingDate: Yup.date().nullable().notRequired(),
  comment: Yup.string().max(300, "Max 300 characters"),
});

export default function BookingForm() {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = async (
    values: BookingFormValues,
    actions: FormikHelpers<BookingFormValues>
  ) => {
    try {
      toast.success("Thank you! We will contact you soon.");
      actions.resetForm();
      setShowCalendar(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className={css.card}>
        <h3 className={css.title}>Book your car now</h3>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={BookingSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isValid, dirty, isSubmitting }) => (
            <Form className={css.form}>
              <label className={css.label} htmlFor="name">
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className={css.input}
                  placeholder="Name*"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </label>

              <label className={css.label} htmlFor="email">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={css.input}
                  placeholder="Email*"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </label>

              <div className={css.dateWrapper}>
                <label className={css.label}>
                  <button
                    type="button"
                    className={`${css.input} ${css.dateInput}`}
                    onClick={() => setShowCalendar((prev) => !prev)}
                  >
                    {values.bookingDate
                      ? format(values.bookingDate, "dd.MM.yyyy")
                      : "Booking date"}
                  </button>
                </label>

                {showCalendar && (
                  <div className={css.calendarDropdown}>
                    <Calendar
                      value={values.bookingDate}
                      onChange={(date) => {
                        setFieldValue("bookingDate", date);
                        setShowCalendar(false);
                      }}
                    />
                  </div>
                )}

                <ErrorMessage
                  name="bookingDate"
                  component="span"
                  className={css.error}
                />
              </div>

              <label className={css.label} htmlFor="comment">
                <Field
                  as="textarea"
                  id="comment"
                  name="comment"
                  className={`${css.input} ${css.textarea}`}
                  placeholder="Comment"
                  rows={4}
                />
                <ErrorMessage
                  name="comment"
                  component="span"
                  className={css.error}
                />
              </label>

              <button
                type="submit"
                className={css.button}
                disabled={isSubmitting || !isValid || !dirty}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
