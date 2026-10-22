/** Small uppercase kicker with the decorative dot. */
export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="eyebrow">
      <span></span>
      {children}
    </p>
  );
}
