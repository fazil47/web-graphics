export default function CloseButton({ setClose }: { setClose: () => void }) {
  return (
    <svg
      width="40"
      height="40"
      fill="none"
      viewBox="-8.005 -8.005 40 40"
      xmlns="http://www.w3.org/2000/svg"
      onClick={setClose}
    >
      <path
        d="m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z"
        fill="currentColor"
      />
    </svg>
  );
}
