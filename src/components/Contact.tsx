import React, { useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { CheckIcon, SendIcon } from "./Icons";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const INITIAL_FORM_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  if (!siteKey || siteKey.includes("://")) {
    throw new Error(
      "Missing or unresolved VITE_TURNSTILE_SITE_KEY. Ensure the environment variable is configured and resolved."
    );
  }

  useEffect(() => {
    if (import.meta.env.DEV || import.meta.env.MODE === "test") {
      (window as unknown as { __setTurnstileToken?: (token: string) => void }).__setTurnstileToken = (token: string) => {
        setTurnstileToken(token);
        setErrorMessage(null);
      };
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!turnstileToken) {
      setErrorMessage("Please complete the Cloudflare security verification challenge.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          message: formData.message.trim(),
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData(INITIAL_FORM_DATA);
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
      // Reset Turnstile token on failure so user can re-verify
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage(null);
    setFormData(INITIAL_FORM_DATA);
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-xl mx-auto text-lg">
            Have a question, exciting opportunity, or want to collaborate? Drop me a message below.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-gradient-to-br from-purple-900/30 via-slate-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-400/20 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {status === "success" ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-400 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
                <CheckIcon className="w-9 h-9" />
              </div>
              <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
              <p className="text-gray-300 max-w-md mx-auto text-lg leading-relaxed">
                Thank you for reaching out! Your message has been safely delivered, and I'll get back to you as soon as possible.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate={false} className="space-y-6 relative z-10">
              {status === "error" && errorMessage && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm flex items-center justify-between"
                >
                  <span>{errorMessage}</span>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="ml-4 text-red-400 hover:text-red-200 text-base font-bold"
                    aria-label="Dismiss error"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-200 mb-1.5"
                  >
                    First Name <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    maxLength={100}
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    className="w-full bg-slate-900/70 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-200 mb-1.5"
                  >
                    Last Name <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    maxLength={100}
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full bg-slate-900/70 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Contact Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-200 mb-1"
                  >
                    Email Address <span className="text-pink-400">*</span>
                  </label>
                  <span id="email-hint" className="block text-xs text-gray-400 mb-1.5">
                    Format: name@example.com
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane.doe@example.com"
                    aria-describedby="email-hint"
                    className="w-full bg-slate-900/70 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-200 mb-1"
                  >
                    Phone Number <span className="text-pink-400">*</span>
                  </label>
                  <span id="phone-hint" className="block text-xs text-gray-400 mb-1.5">
                    10-20 digits (e.g., 555-123-4567)
                  </span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    minLength={10}
                    maxLength={20}
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    aria-describedby="phone-hint"
                    className="w-full bg-slate-900/70 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  Message <span className="text-pink-400">*</span>
                </label>
                <span id="message-hint" className="block text-xs text-gray-400 mb-1.5">
                  Between 5 and 1000 characters ({formData.message.length}/1000)
                </span>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  minLength={5}
                  maxLength={1000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or inquiry..."
                  aria-describedby="message-hint"
                  className="w-full bg-slate-900/70 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-y"
                ></textarea>
              </div>

              {/* Cloudflare Verification */}
              <div className="pt-2 flex flex-col items-center justify-center min-h-[75px]">
                {turnstileToken ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-500">
                    <CheckIcon className="w-4 h-4 text-emerald-400" />
                    <span>Security Verified</span>
                  </div>
                ) : (
                  <div className="transition-opacity duration-300">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={siteKey}
                      options={{
                        theme: "dark",
                        size: "normal",
                        action: "contact",
                      }}
                      onSuccess={(token) => {
                        setTurnstileToken(token);
                        setErrorMessage(null);
                      }}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => {
                        setTurnstileToken(null);
                        setErrorMessage("Security check encountered an error. Please try again.");
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting" || !turnstileToken}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-3.5 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Protected by Cloudflare Turnstile bot verification
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
