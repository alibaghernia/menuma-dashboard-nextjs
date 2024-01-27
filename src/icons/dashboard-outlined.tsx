import React from "react";
import { Icon } from "./type";

const DashboardOutlinedIcon: Icon = ({
  width = 14,
  height = 14,
  color = "#fff",
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
          d="M13.45 4.52961C13.0986 3.6979 12.5892 2.94227 11.95 2.30461C11.3123 1.6654 10.5567 1.15599 9.725 0.804608C8.86094 0.438983 7.94531 0.254608 7 0.254608C6.05469 0.254608 5.13906 0.438983 4.275 0.804608C3.4433 1.15599 2.68767 1.6654 2.05 2.30461C1.41079 2.94227 0.901382 3.6979 0.55 4.52961C0.184375 5.39367 0 6.3093 0 7.25461C0 9.32805 0.910937 11.2812 2.49844 12.6155L2.525 12.6374C2.61563 12.7124 2.72969 12.7546 2.84687 12.7546H11.1547C11.2719 12.7546 11.3859 12.7124 11.4766 12.6374L11.5031 12.6155C13.0891 11.2812 14 9.32805 14 7.25461C14 6.3093 13.8141 5.39367 13.45 4.52961ZM10.8969 11.5671H3.10313C2.49937 11.0227 2.01682 10.3575 1.68681 9.61453C1.35679 8.87158 1.18667 8.06755 1.1875 7.25461C1.1875 5.70148 1.79219 4.24211 2.89062 3.14523C3.98906 2.0468 5.44844 1.44211 7 1.44211C8.55313 1.44211 10.0125 2.0468 11.1094 3.14523C12.2078 4.24367 12.8125 5.70305 12.8125 7.25461C12.8125 8.90461 12.1172 10.4655 10.8969 11.5671ZM8.74219 5.09055C8.71869 5.06728 8.68697 5.05423 8.65391 5.05423C8.62084 5.05423 8.58912 5.06728 8.56563 5.09055L7.24531 6.41086C6.95312 6.33273 6.62969 6.40773 6.4 6.63742C6.31865 6.71862 6.2541 6.81507 6.21007 6.92124C6.16603 7.02741 6.14336 7.14123 6.14336 7.25617C6.14336 7.37111 6.16603 7.48493 6.21007 7.5911C6.2541 7.69728 6.31865 7.79372 6.4 7.87492C6.4812 7.95628 6.57765 8.02082 6.68382 8.06485C6.78999 8.10889 6.90381 8.13156 7.01875 8.13156C7.13369 8.13156 7.24751 8.10889 7.35368 8.06485C7.45985 8.02082 7.5563 7.95628 7.6375 7.87492C7.74632 7.76643 7.82458 7.63113 7.86436 7.48271C7.90414 7.33428 7.90404 7.17798 7.86406 7.02961L9.18437 5.7093C9.23281 5.66086 9.23281 5.58117 9.18437 5.53273L8.74219 5.09055ZM6.65625 3.50461H7.34375C7.4125 3.50461 7.46875 3.44836 7.46875 3.37961V2.12961C7.46875 2.06086 7.4125 2.00461 7.34375 2.00461H6.65625C6.5875 2.00461 6.53125 2.06086 6.53125 2.12961V3.37961C6.53125 3.44836 6.5875 3.50461 6.65625 3.50461ZM10.7188 6.91086V7.59836C10.7188 7.66711 10.775 7.72336 10.8438 7.72336H12.0938C12.1625 7.72336 12.2188 7.66711 12.2188 7.59836V6.91086C12.2188 6.84211 12.1625 6.78586 12.0938 6.78586H10.8438C10.775 6.78586 10.7188 6.84211 10.7188 6.91086ZM10.9172 3.82961L10.4312 3.34367C10.4078 3.32041 10.376 3.30736 10.343 3.30736C10.3099 3.30736 10.2782 3.32041 10.2547 3.34367L9.37031 4.22805C9.34705 4.25154 9.334 4.28327 9.334 4.31633C9.334 4.34939 9.34705 4.38112 9.37031 4.40461L9.85625 4.89055C9.90469 4.93898 9.98438 4.93898 10.0328 4.89055L10.9172 4.00617C10.9656 3.95773 10.9656 3.87805 10.9172 3.82961ZM3.75156 3.34367C3.72807 3.32041 3.69634 3.30736 3.66328 3.30736C3.63022 3.30736 3.59849 3.32041 3.575 3.34367L3.08906 3.82961C3.0658 3.8531 3.05275 3.88483 3.05275 3.91789C3.05275 3.95095 3.0658 3.98268 3.08906 4.00617L3.97344 4.89055C4.02187 4.93898 4.10156 4.93898 4.15 4.89055L4.63594 4.40461C4.68438 4.35617 4.68438 4.27648 4.63594 4.22805L3.75156 3.34367ZM3.09375 6.78586H1.84375C1.775 6.78586 1.71875 6.84211 1.71875 6.91086V7.59836C1.71875 7.66711 1.775 7.72336 1.84375 7.72336H3.09375C3.1625 7.72336 3.21875 7.66711 3.21875 7.59836V6.91086C3.21875 6.84211 3.1625 6.78586 3.09375 6.78586Z"
          fill={color}
        />
      </svg>
    </span>
  );
};

export default DashboardOutlinedIcon;
