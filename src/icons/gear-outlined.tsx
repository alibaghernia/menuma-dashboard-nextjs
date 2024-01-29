import React from "react";
import { Icon } from "./type";

const GearOutlined: Icon = ({
  width = 14,
  height = 14,
  color = "#000",
  ...props
}) => {
  return (
    <span {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M5.9121 11.7527L5.70093 10.0657C5.51465 10.0093 5.3134 9.92106 5.09718 9.80089C4.88057 9.68033 4.69623 9.55122 4.54418 9.41356L2.98843 10.0756L1.90051 8.17981L3.2451 7.16597C3.22799 7.0602 3.21379 6.95131 3.20251 6.83931C3.19162 6.7277 3.18618 6.6192 3.18618 6.51381C3.18618 6.41581 3.19162 6.31275 3.20251 6.20464C3.2134 6.09653 3.2276 5.97481 3.2451 5.83947L1.90051 4.82564L2.98843 2.95197L4.5331 3.60356C4.70732 3.4585 4.89593 3.32764 5.09893 3.21097C5.30115 3.09431 5.49812 3.00408 5.68985 2.94031L5.91151 1.25272H8.08793L8.2991 2.95139C8.52271 3.02956 8.72026 3.11958 8.89176 3.22147C9.06365 3.32336 9.2404 3.45053 9.42201 3.60297L11.0116 2.95197L12.0995 4.82564L10.71 5.87331C10.7419 5.99386 10.7598 6.10431 10.7637 6.20464C10.7676 6.30575 10.7695 6.40511 10.7695 6.50272C10.7695 6.59333 10.7656 6.68881 10.7578 6.78914C10.7505 6.88986 10.7333 7.01158 10.7065 7.15431L12.0738 8.17981L10.9859 10.0756L9.42201 9.40247C9.2404 9.55492 9.05762 9.68578 8.87368 9.79506C8.68935 9.90433 8.49782 9.99067 8.2991 10.0541L8.08793 11.7527H5.9121ZM6.41668 11.1694H7.55768L7.77293 9.58972C8.06693 9.51195 8.33137 9.4052 8.56626 9.26947C8.80154 9.13375 9.0411 8.94786 9.28493 8.71181L10.7403 9.33189L11.3202 8.34022L10.0433 7.38122C10.0919 7.21517 10.1242 7.06233 10.1401 6.92272C10.1557 6.7835 10.1634 6.6435 10.1634 6.50272C10.1634 6.35495 10.1557 6.21495 10.1401 6.08272C10.1245 5.9505 10.0923 5.80525 10.0433 5.64697L11.3423 4.66522L10.7625 3.67356L9.27385 4.29772C9.09729 4.10367 8.86532 3.92206 8.57793 3.75289C8.29054 3.58372 8.01832 3.47133 7.76126 3.41572L7.58335 1.83606H6.42018L6.23818 3.40406C5.94418 3.46706 5.6739 3.56817 5.42735 3.70739C5.18118 3.84739 4.93618 4.03911 4.69235 4.28256L3.23751 3.67356L2.65768 4.66522L3.92293 5.61022C3.87432 5.74089 3.84029 5.88283 3.82085 6.03606C3.8014 6.18928 3.79168 6.34872 3.79168 6.51439C3.79168 6.66217 3.8014 6.80897 3.82085 6.95481C3.84029 7.10064 3.87062 7.24258 3.91185 7.38064L2.65768 8.34022L3.23751 9.33189L4.68126 8.71939C4.90993 8.95039 5.14754 9.1357 5.3941 9.27531C5.64065 9.41492 5.91832 9.52361 6.2271 9.60139L6.41668 11.1694ZM6.98426 7.96106C7.39104 7.96106 7.73579 7.8197 8.01851 7.53697C8.30124 7.25425 8.4426 6.9095 8.4426 6.50272C8.4426 6.09595 8.30124 5.7512 8.01851 5.46847C7.73579 5.18575 7.39104 5.04439 6.98426 5.04439C6.57515 5.04439 6.22982 5.18575 5.94826 5.46847C5.66671 5.7512 5.52593 6.09595 5.52593 6.50272C5.52593 6.9095 5.66671 7.25425 5.94826 7.53697C6.22982 7.8197 6.57515 7.96106 6.98426 7.96106Z"
          fill={color}
          fill-opacity="0.85"
        />
      </svg>
    </span>
  );
};

export default GearOutlined;