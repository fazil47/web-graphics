import CloseButton from "./CloseButton";

export default function NavigationButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  if (isOpen) {
    return <CloseButton setClose={() => setIsOpen(false)} />;
  }

  // Otherwise show the navigation icon
  return (
    <svg
      width="40"
      height="40"
      fill="none"
      viewBox="-7.5 -9.5 40 40"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setIsOpen(true)}
    >
      <path
        d="M3 17h18a1 1 0 0 1 .117 1.993L21 19H3a1 1 0 0 1-.117-1.993L3 17h18H3Zm0-6 18-.002a1 1 0 0 1 .117 1.993l-.117.007L3 13a1 1 0 0 1-.117-1.993L3 11l18-.002L3 11Zm0-6h18a1 1 0 0 1 .117 1.993L21 7H3a1 1 0 0 1-.117-1.993L3 5h18H3Z"
        fill="currentColor"
      />
    </svg>
  );
}
