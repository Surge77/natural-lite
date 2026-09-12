/**
 * Footer contact marks and social platform marks.
 *
 * Platform glyphs are filled brand shapes rather than strokes, so each sets its
 * own fill/stroke instead of inheriting the sprite's stroked default.
 */
export function ContactSymbols() {
  return (
    <>
      <symbol id="nl-phone" viewBox="0 0 24 24">
        <path d="M8.2 3.8 10 7.6l-1.9 1.6a11 11 0 0 0 4.7 4.7l1.6-1.9 3.8 1.8v3.4a1.6 1.6 0 0 1-1.8 1.6C9.7 18.2 5.8 14.3 4.8 6.2a1.6 1.6 0 0 1 1.6-1.8h1.8z" />
      </symbol>

      <symbol id="nl-mail" viewBox="0 0 24 24">
        <rect x="3.2" y="5.6" width="17.6" height="12.8" rx="2" />
        <path d="m3.8 7 8.2 5.8L20.2 7" />
      </symbol>

      <symbol id="nl-pin" viewBox="0 0 24 24">
        <path d="M12 20.8c3.6-4.5 5.4-7.8 5.4-10.1a5.4 5.4 0 1 0-10.8 0c0 2.3 1.8 5.6 5.4 10.1z" />
        <circle cx="12" cy="10.4" r="2.1" />
      </symbol>

      <symbol id="nl-instagram" viewBox="0 0 24 24">
        <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17" cy="7" r="1.15" fill="currentColor" stroke="none" />
      </symbol>

      <symbol id="nl-facebook" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          stroke="none"
          d="M13.6 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.8V3.6A21 21 0 0 0 14.4 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.7V13h2.7v8z"
        />
      </symbol>

      <symbol id="nl-youtube" viewBox="0 0 24 24">
        <rect x="2.6" y="5.4" width="18.8" height="13.2" rx="4" />
        <path fill="currentColor" stroke="none" d="M10.4 9.1v5.8L15.4 12z" />
      </symbol>

      <symbol id="nl-whatsapp" viewBox="0 0 24 24">
        <path d="M3.6 20.4 5 16.5a8 8 0 1 1 3 3z" />
        <path d="M9.1 9.2c-.35.8-.15 1.8.55 2.7a7 7 0 0 0 2.5 2.1c1 .45 1.95.5 2.6.05" />
      </symbol>
    </>
  );
}
