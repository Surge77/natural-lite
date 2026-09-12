/**
 * Payment brand marks, drawn as vectors so they stay crisp at any size.
 *
 * These reproduce each scheme's mark as it appears in the comp. They are
 * third-party trademarks: confirm the client is licensed to display them and
 * swap in the official SVGs before launch — see docs/CLIENT-QUESTIONS.md.
 *
 * Each is sized to a 48x30 chip so the row aligns without per-mark nudging.
 */

const CHIP = 'h-[1.35rem] w-auto rounded-[3px] bg-white px-1.5 py-1';

export function VisaMark() {
  return (
    <svg viewBox="0 0 48 16" className={CHIP} role="img" aria-label="Visa">
      <text
        x="24"
        y="13"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="14"
        fontWeight="700"
        fontStyle="italic"
        letterSpacing="0.5"
        fill="#1A1F71"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardMark() {
  return (
    <svg viewBox="0 0 48 20" className={CHIP} role="img" aria-label="Mastercard">
      <circle cx="20" cy="9" r="8" fill="#EB001B" />
      <circle cx="28" cy="9" r="8" fill="#F79E1B" />
      {/* The overlap reads as a third colour in the real mark. */}
      <path
        d="M24 3.1a8 8 0 0 0 0 11.8 8 8 0 0 0 0-11.8z"
        fill="#FF5F00"
      />
      <text
        x="24"
        y="19.5"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="3.4"
        letterSpacing="0.15"
        fill="#1A1F36"
      >
        mastercard
      </text>
    </svg>
  );
}

export function RupayMark() {
  return (
    <svg viewBox="0 0 52 16" className={CHIP} role="img" aria-label="RuPay">
      <text
        x="2"
        y="13"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="12.5"
        fontWeight="700"
        fontStyle="italic"
        fill="#1A1F71"
      >
        Ru
      </text>
      <text
        x="17"
        y="13"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="12.5"
        fontWeight="700"
        fontStyle="italic"
        fill="#097A3D"
      >
        Pay
      </text>
      <path d="M44 4.5 50 8l-6 3.5z" fill="#F58220" />
    </svg>
  );
}

/** UPI sits directly on the footer bar in the comp, without a white chip. */
export function UpiMark() {
  return (
    <svg viewBox="0 0 44 16" className="h-[1.35rem] w-auto" role="img" aria-label="UPI">
      <text
        x="2"
        y="12"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="12.5"
        fontWeight="700"
        fontStyle="italic"
        letterSpacing="0.4"
        fill="var(--color-nl-cream-50)"
        opacity="0.92"
      >
        UPI
      </text>
      <path d="M32 3 38 8l-6 5z" fill="#F58220" />
      <path d="M36 3 42 8l-6 5z" fill="#097A3D" />
      <path d="M2 14.2h28" stroke="var(--color-nl-cream-50)" strokeWidth="0.9" opacity="0.7" />
    </svg>
  );
}
