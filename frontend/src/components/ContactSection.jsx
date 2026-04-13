import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send message.');
      }

      setForm(initialForm);
      setStatus({
        type: 'success',
        message: result.message || 'Message received.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="~/portfolio/contact"
      title="Send a signal."
      description="Tell me what you are building, what is stuck, or where the interface should feel sharper."
    >
      {(isInView) => (
        <motion.form
          className="glass-panel grid gap-4 rounded-lg p-5 md:p-7"
          onSubmit={handleSubmit}
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
              required
            />
          </label>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-300 px-5 py-3 font-mono text-sm font-bold text-black shadow-glow transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
              whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.96 }}
            >
              <TerminalText
                text={isSubmitting ? 'sending...' : 'send message'}
                start={isInView}
                delay={1080}
                speed={18}
                cursor={false}
              />
            </motion.button>

            {status.message ? (
              <p
                className={`font-mono text-sm ${
                  status.type === 'success'
                    ? 'text-lime-200'
                    : 'text-red-300'
                }`}
                role="status"
              >
                <TerminalText text={status.message} speed={14} />
              </p>
            ) : null}
          </div>
        </motion.form>
      )}
    </SectionShell>
  );
}

export default ContactSection;
