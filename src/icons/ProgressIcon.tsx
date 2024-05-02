import React from "react";

// type
type ProgressIconProps = {
  fill?: string;
};

const ProgressIcon = ({ fill }: ProgressIconProps) => {
  return (
    <svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 6.5H20C22.2091 6.5 24 8.29086 24 10.5V15.0714C24 16.965 22.465 18.5 20.5714 18.5H12C5.37258 18.5 0 13.1274 0 6.5Z"
        fill={fill || "#D9D9D9"}
      />
    </svg>
  );
};

export default ProgressIcon;
