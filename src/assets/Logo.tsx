import { Link } from "react-router";

export const Logo = () => (
  <Link to="/" className="flex items-center gap-1">
    {/* Logo Icon */}
    <div>
      {/* Light mode */}
      <svg
        className="dark:hidden"
        width="34"
        height="40"
        viewBox="0 0 34 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradLight" x1="0" y1="0" x2="34" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06D1D4" />
            <stop offset="1" stopColor="#3628A0" />
          </linearGradient>
        </defs>
        <path d="M17 0L23 6L0 26V14L17 0Z" fill="url(#gradLight)" />
        <path d="M4 28L17 40L34 26V14L23 6L0 26V20L23 6V21L12 31V22L4 28Z" fill="url(#gradLight)" />
      </svg>

      {/* Dark mode */}
      <svg
        className="hidden dark:block"
        width="34"
        height="40"
        viewBox="0 0 34 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradDark" x1="0" y1="0" x2="34" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#bbbbbb" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M17 0L23 6L0 26V14L17 0Z" fill="url(#gradDark)" />
        <path d="M4 28L17 40L34 26V14L23 6L0 26V20L23 6V21L12 31V22L4 28Z" fill="url(#gradDark)" />
      </svg>
    </div>

    {/* Logo Text */}
    <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
      <span className="text-primary">Digi</span>
      <span className="text-indigo-600 dark:text-indigo-400">Pay</span>
    </span>
  </Link>
);
