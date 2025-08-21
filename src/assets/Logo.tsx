import { Link } from "react-router";

export const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    {/* Icon */}
    <div>
      <svg width="34" height="40" viewBox="0 0 34 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradLightDark" x1="0" y1="0" x2="34" y2="40" gradientUnits="userSpaceOnUse">

            <stop stop-color="#4EF1F3" />

            <stop offset="0.6" stop-color="#3B82F6" />

            <stop offset="1" stop-color="#1E1B4B" />
          </linearGradient>
        </defs>
        <path d="M17 0L23 6L0 26V14L17 0Z" fill="url(#gradLightDark)" />
        <path d="M4 28L17 40L34 26V14L23 6L0 26V20L23 6V21L12 31V22L4 28Z" fill="url(#gradLightDark)" />
      </svg>



    </div>

    {/* Gradient Text */}
    <span className="text-2xl font-extrabold tracking-tight">
      <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-600 bg-clip-text text-transparent">
        DigiPay
      </span>
    </span>
  </Link>
);
