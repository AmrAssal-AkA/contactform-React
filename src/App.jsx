import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "this field is required";
    if (!form.lastName.trim()) e.lastName = "this field is required";

    if (!form.email.trim()) {
      e.email = "this field is required";
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) e.email = "Please enter a valid email address";
    }
    if (!form.queryType) e.queryType = "Please Select a query type";
    if (!form.message.trim()) e.message = "This Field is required";
    if (!form.consent)
      e.consent = "To submit this form, please consent to being contactrd";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSuccess(false);
  };
  const hundleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);

    if (Object.keys(e).length === 0) {
      setSuccess(true);

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        queryType: "",
        message: "",
        consent: false,
      });
      setTimeout(() => setSuccess(false), 4000);
    } else {
      const firstKey = Object.keys(e)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-4xl">
        {success && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-emerald-800 text-white px-6 py-3 rounded-md shadow-md">
            <div className="font-semibold">Message Sent!</div>
            <div className="text-ms">
              Thanks for completing the form. we'll be in touch soon!
            </div>
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Contact Us
        </h2>
        <form className="space-y-6" onSubmit={hundleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-green-400">*</span>
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                type="text"
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 cursor-pointer ${
                  errors.firstName
                    ? "border-red-500 ring-red-50"
                    : "border-gray-300 focus:ring-green-200"
                }`}
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? "err-firstName" : undefined
                }
              />
              {errors.firstName && (
                <p id="err-firstName" className="mt=1 text-xs text-red-600">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-green-400">*</span>
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                type="text"
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 cursor-pointer ${
                  errors.lastName
                    ? "border-red=500 ring-red-50"
                    : "border-gray-300 focus:ring-green-200"
                }`}
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "err-lastName" : undefined}
              />
              {errors.lastName && (
                <p id="err-lastName" className="mt-1 text-xs text-red-600">
                  {errors.lastName}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block w-full text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-green-500">*</span>
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 cursor-pointer ${
                  errors.lastName
                    ? "border-red-500 ring-red-50"
                    : "border-gray-300 focus:ring-green-200"
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <p id="err-email" className="mt-1 taxt-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
            {/* queryType  */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Query Type <span className="text-green-500">*</span>
              </label>
              <div className="flex gap-4">
                <label
                  className={`flex items-center w-100 border border-gray-300 rounded-md px-3 py-2 cursor-pointer ${
                    form.queryType === "general"
                      ? "bg-green-50 border-green-300"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    name="queryType"
                    value="general"
                    checked={form.queryType === "general"}
                    onChange={handleChange}
                    type="radio"
                    className="form-radio text-green-600 mr-2"
                  />
                  General Enquiry
                </label>
                <label
                  className={`flex items-center w-100 border border-gray-300 rounded-md px-3 py-2 cursor-pointer ${
                    form.queryType === "support"
                      ? "bg-green-50 border-green-300"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="queryType"
                    value="support"
                    checked={form.queryType === "support"}
                    onChange={handleChange}
                    className="form-radio text-green-600 mr-2"
                  />
                  Support Request
                </label>
              </div>
            </div>
            {/* Message Form */}
            <div className="md:col-span-2 mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-green-500">*</span>
                   </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full border border-gray-300 rounded-md px-3 py-15 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                      errors.message
                      ? "border-red-500 ring-red-50"
                      : "border-gray-300"
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                  required
                />
                  {errors.message && (
                    <p id="err-message" className="mt-1 text-xs text-red-600">
                      {errors.message}
                    </p>
                  )}
            </div>
            <div className="flex items-center md:col-span-2">
              <input
              name="consent"
              checked={form.consent}
              onChange={handleChange}
                type="checkbox"
                className={`form-checkkbox text-green-600 mr-2 ${
                  errors.consent ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              <label className="text-sm text-gray-700">
                I consent to being contacted by the team{" "}
                <span className="text-green-500">*</span>
              </label>
            </div>
            {errors.consent && (
              <p className="md:col-span-1 mt-1 text-xs text-gray-600">{errors.consent}</p>
            )}
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md transition md:col-span-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
