import { useEffect, useState } from 'react';

function TerminalText({
  text,
  as: Tag = 'span',
  className = '',
  speed = 22,
  delay = 0,
  start = true,
  cursor = true,
  ariaLabel,
}) {
  const [visibleText, setVisibleText] = useState(text);

  useEffect(() => {
    if (!start) {
      setVisibleText(text);
      return undefined;
    }

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisibleText(text);
      return undefined;
    }

    setVisibleText('');
    let index = 0;
    let intervalId;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [delay, speed, start, text]);

  return (
    <Tag className={className} aria-label={ariaLabel} aria-live={ariaLabel ? 'off' : undefined}>
      {visibleText}
      {cursor ? <span className="terminal-cursor">_</span> : null}
    </Tag>
  );
}

export default TerminalText;
