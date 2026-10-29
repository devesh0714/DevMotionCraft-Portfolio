import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import SectionShell from './SectionShell';
import TerminalText from './TerminalText';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInProgress = useRef(false);
  const retryKey = useRef(null);

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ type: 'error', message: 'Please complete all fields before sending.' });
      return;
    }

    const payloadSignature = JSON.stringify(payload);
    if (retryKey.current?.payloadSignature !== payloadSignature) {
      const requestId = window.crypto?.randomUUID?.()
        || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      retryKey.current = {
        payloadSignature,
        idempotencyKey: `portfolio-contact/${requestId}`,
      };
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')
      || (import.meta.env.DEV ? 'http://localhost:5050/api' : '');

      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': retryKey.current.idempotencyKey,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send message.');
      }

      setForm(initialForm);
      retryKey.current = null;
      setStatus({
        type: 'success',
        message: result.message || 'Message sent successfully. Thank you for reaching out!',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong.',
      });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="~/portfolio/contact"
      title="Get in touch."
      description="Have a project in mind or want to connect? Send me a message and I’ll get back to you."
    >
      {(isInView) => (
        <motion.form
          className="glass-panel grid gap-4 rounded-lg p-5 md:p-7"
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <label className="grid gap-2 font-mono text-sm text-emerald-100/76">
            <TerminalText text="name" start={isInView} delay={600} speed={18} />
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Ada Lovelace"
              className="rounded-lg border border-emerald-300/15 bg-black/35 px-4 py-3 text-emerald-50 outline-none transition duration-300 placeholder:text-emerald-100/30 focus:border-lime-200/70 focus:ring-2 focus:ring-lime-200/30"
              autoComplete="name"
              maxLength={100}
              required
            />
          </label>

          <label className="grid gap-2 font-mono text-sm text-emerald-100/76">
            <TerminalText text="email" start={isInView} delay={760} speed={18} />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="ada@example.com"
              className="rounded-lg border border-emerald-300/15 bg-black/35 px-4 py-3 text-emerald-50 outline-none transition duration-300 placeholder:text-emerald-100/30 focus:border-lime-200/70 focus:ring-2 focus:ring-lime-200/30"
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>

          <label className="grid gap-2 font-mono text-sm text-emerald-100/76">
            <TerminalText
              text="message"
              start={isInView}
              delay={920}
              speed={18}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              placeholder="I need a portfolio that feels precise, fast, and memorable."
              className="min-h-40 resize-y rounded-lg border border-emerald-300/15 bg-black/35 px-4 py-3 text-emerald-50 outline-none transition duration-300 placeholder:text-emerald-100/30 focus:border-lime-200/70 focus:ring-2 focus:ring-lime-200/30"
              maxLength={5000}
              required
            />
          </label>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="rounded-lg bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-300 px-5 py-3 font-mono text-sm font-bold text-black shadow-glow transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
              whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.96 }}
            >
              {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              <TerminalText
                text={isSubmitting ? 'sending...' : 'send message'}
                start={isInView}
                delay={1080}
                speed={18}
                cursor={false}
              />
            </motion.button>

            <p
                className={`min-h-5 font-mono text-sm ${
                  status.type === 'success'
                    ? 'text-lime-200'
                    : 'text-red-300'
                }`}
                role={status.type === 'error' ? 'alert' : 'status'}
                aria-live={status.type === 'error' ? 'assertive' : 'polite'}
                aria-atomic="true"
              >
                {status.message ? <TerminalText text={status.message} speed={14} /> : null}
              </p>
          </div>
        </motion.form>
      )}
    </SectionShell>
  );
}

export default ContactSection;
