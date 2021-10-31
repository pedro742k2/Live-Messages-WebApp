import styles from "./styles.module.scss";

export const LoadingPage = () => {
  return (
    <div className={styles.loadingCircleContainer}>
      <svg
        width="250"
        height="250"
        viewBox="0 0 250 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id={styles.loadingCircle}
          cx="125"
          cy="125"
          r="115"
          stroke="url(#paint0_linear_1:3)"
          strokeWidth="20"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1:3"
            x1="125"
            y1="0"
            x2="125"
            y2="250"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFCD1E" />
            <stop offset="1" stopColor="#FF008E" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
