import "./Highlight.css";

export default function HL({ children }: { children: React.ReactNode }) {
  return <p className="highlight">{children}</p>;
}
