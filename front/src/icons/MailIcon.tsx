import type { SVGProps } from 'react';

const SvgMailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#fff"
      d="M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.588-1.412A1.92 1.92 0 0 1 4 4h16q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413A1.93 1.93 0 0 1 20 20zm8-7L4 8v10h16V8zm0-2 8-5H4zM4 8V6v12z"
    />
  </svg>
);
export default SvgMailIcon;
