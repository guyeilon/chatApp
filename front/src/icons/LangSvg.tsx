import type { SVGProps } from 'react';

const SvgLangSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="1em"
    height="1em"
    aria-hidden="true"
    className="langSvg_svg__globe"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <path
        id="langSvg_svg__a"
        d="M14.617 19.552A13.1 13.1 0 0 0 16.975 13h2.955a8.01 8.01 0 0 1-5.313 6.552M4.069 13h2.992a12.9 12.9 0 0 0 2.346 6.561A8.02 8.02 0 0 1 4.069 13m5.369-8.571A13.14 13.14 0 0 0 7.065 11H4.069a8.01 8.01 0 0 1 5.369-6.571M9.079 11c.306-3.272 1.98-5.55 2.947-6.603 1 1.071 2.648 3.328 2.933 6.603zm.001 2h5.882c-.306 3.277-1.984 5.555-2.95 6.608A11.02 11.02 0 0 1 9.08 13m10.85-2h-2.952a12.9 12.9 0 0 0-2.328-6.539A8.01 8.01 0 0 1 19.93 11M22 12c0-5.504-4.471-9.982-9.972-9.998l-.013-.001L12 2C6.486 2 2 6.487 2 12c0 5.514 4.486 10 10 10l.015-.001.005.001.008-.002C17.529 21.983 22 17.504 22 12"
      />
    </defs>
    <use xlinkHref="#langSvg_svg__a" fill="#FFF" fillRule="nonzero" />
  </svg>
);
export default SvgLangSvg;
