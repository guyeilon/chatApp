import { SVGProps } from 'react';

const SvgFavicon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 410 404"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m399.641 59.525-183.998 329.02c-3.799 6.793-13.559 6.833-17.415.073L10.582 59.556C6.38 52.19 12.68 43.266 21.028 44.76l184.195 32.923c1.175.21 2.378.208 3.553-.006l180.343-32.87c8.32-1.517 14.649 7.337 10.522 14.719Z"
      fill="url(#favicon_svg__a)"
    />
    <path
      d="M292.965 1.574 156.801 28.255a5 5 0 0 0-4.03 4.611l-8.376 141.464c-.197 3.332 2.863 5.918 6.115 5.168l37.91-8.749c3.547-.818 6.752 2.306 6.023 5.873l-11.263 55.153c-.758 3.712 2.727 6.886 6.352 5.785l23.415-7.114c3.63-1.102 7.118 2.081 6.35 5.796l-17.899 86.633c-1.12 5.419 6.088 8.374 9.094 3.728l2.008-3.103 110.954-221.428c1.858-3.707-1.346-7.935-5.418-7.15l-39.022 7.532c-3.667.707-6.787-2.708-5.752-6.296l25.469-88.291c1.036-3.594-2.095-7.012-5.766-6.293Z"
      fill="url(#favicon_svg__b)"
    />
    <defs>
      <linearGradient
        id="favicon_svg__a"
        x1={6}
        y1={33}
        x2={235}
        y2={344}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#41D1FF" />
        <stop offset={1} stopColor="#BD34FE" />
      </linearGradient>
      <linearGradient
        id="favicon_svg__b"
        x1={194.651}
        y1={8.818}
        x2={236.076}
        y2={292.989}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFEA83" />
        <stop offset={0.083} stopColor="#FFDD35" />
        <stop offset={1} stopColor="#FFA800" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgFavicon;
