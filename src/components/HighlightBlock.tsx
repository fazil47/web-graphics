import "./HighlightBlock.css";

export default function HLB({ children }: { children: React.ReactNode }) {
  return <code className="highlightBlock">{children}</code>;
}
