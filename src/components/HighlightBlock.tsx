import "./HighlightBlock.css";

export default function HLB({ children }: { children: React.ReactNode }) {
  return <p className="highlightBlock">{children}</p>;
}
