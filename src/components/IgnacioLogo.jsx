const IgnacioLogo = ({ className = "w-16 h-16" }) => {
  return (
    <svg
      viewBox="0 0 197 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo"
      role="img"
    >
      {/* Main geometric logo */}
      <path
        d="
          M18 37
          H118
          V73
          L101 60
          V48
          H42
          L18 37
          Z

          M18 48
          L35 60
          V120
          H18
          V48
          Z

          M52 68
          L69 80
          V103
          H103
          L118 88
          V37
          H135
          V94
          L116 120
          H52
          V68
          Z
        "
        fill="currentColor"
      />

      {/* Top square */}
      <rect
        x="135"
        y="12"
        width="17"
        height="17"
        fill="currentColor"
      />
    </svg>
  );
};

export default IgnacioLogo;