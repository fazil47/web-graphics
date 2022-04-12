import "./Highlight.css";

export default function HL({ children }: { children: React.ReactNode }) {
  return <code className="highlight">{children}</code>;
}
