import type { SVGProps } from 'react';

const SvgFormSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#33363F"
      strokeWidth={2}
      d="M4 7c0-1.886 0-2.828.586-3.414S6.114 3 8 3h8c1.886 0 2.828 0 3.414.586S20 5.114 20 7v8c0 2.828 0 4.243-.879 5.121C18.243 21 16.828 21 14 21h-4c-2.828 0-4.243 0-5.121-.879C4 19.243 4 17.828 4 15z"
    />
    <path
      stroke="#33363F"
      strokeLinecap="round"
      strokeWidth={2}
      d="M15 18v3m-6-3v3M9 8h6M9 12h6"
    />
  </svg>
);
export default SvgFormSvg;
