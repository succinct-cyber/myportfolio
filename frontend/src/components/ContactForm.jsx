"use client";
import { useState } from "react";
import { Check, Send } from "lucide-react";
import { postContact } from "@/lib/api";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      await postContact({ name: d.name, email: d.email, topic: d.topic, message: d.message, website: d.website });
      setStatus("ok");
      form.reset();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-5 p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="label mb-2 block">Your name *</span>
          <input name="name" required maxLength={120} placeholder="e.g. Yomi Fabiyi" className="field" />
        </label>
        <label className="block">
          <span className="label mb-2 block">Email address *</span>
          <input name="email" type="email" required placeholder="yomi@example.com" className="field" />
        </label>
      </div>
      <label className="block">
        <span className="label mb-2 block">Topic or project scope</span>
        <input name="topic" maxLength={160} placeholder="e.g. Django API architecture / Backend contracting" className="field" />
      </label>
      <label className="block">
        <span className="label mb-2 block">Message & timeline details *</span>
        <textarea name="message" required rows={6} maxLength={5000} placeholder="Describe your system, timeline, or engineering opportunity..." className="field resize-y" />
      </label>
      {/* Honeypot: hidden from people, irresistible to bots */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn-dark disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"} <Send size={13} />
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "ok" && (
            <span className="inline-flex items-center gap-1.5 text-olive"><Check size={15} /> Message sent. I&apos;ll reply within 24–48 hours.</span>
          )}
          {status === "error" && <span className="text-red-700">{error}</span>}
        </p>
      </div>
    </form>
  );
}
