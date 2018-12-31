// inspired by a codepen example by Nick Salloum:
// https://codepen.io/callmenick/pen/ZWMOEE

import React from "react";
import PropTypes from "prop-types";
// import rainbow from "../img/neonrainbow_noglow_animated.svg";

const Rainbow = props => (
  <div className="rainbow-wrap">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid meet"
      id="svg"
      style={{ overflow: "visible" }}
    >
      <title>neonrainbow_noglow</title>
      <defs>
        <filter
          id="svgglow"
          height="200%"
          width="200%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur
            className="blur"
            result="coloredBlur"
            stdDeviation="10"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g id="red-wrap">
        <path
          id="red"
          data-name="red dark"
          d="M38.12,427c0-215.88,175-390.88,390.88-390.88S819.88,211.12,819.88,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "red",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 24,
            filter: "url(#svgglow)"
          }}
          className="RCwMnecV_0 glow transition--red"
        />
        <path
          id="red_lite"
          data-name="red lite"
          d="M38.12,427c0-215.88,175-390.88,390.88-390.88S819.88,211.12,819.88,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#ff7c84",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 9
          }}
          className="RCwMnecV_1"
        />
      </g>
      <g id="orange-wrap">
        <path
          id="orange"
          data-name="orange dark"
          d="M77.21,427C77.21,232.71,234.71,75.21,429,75.21S780.79,232.71,780.79,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#ff931e",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 24,
            filter: "url(#svgglow)"
          }}
          className="RCwMnecV_2 glow transition--orange"
        />
        <path
          id="orange_lite"
          data-name="orange lite"
          d="M77.21,427C77.21,232.71,234.71,75.21,429,75.21S780.79,232.71,780.79,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#f4d978",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 9,
            opacity: 0.8
          }}
          className="RCwMnecV_3"
        />
      </g>
      <g id="yellow-wrap">
        <path
          id="yellow"
          data-name="yellow dark"
          d="M118,427c0-171.74,139.22-311,311-311S740,255.26,740,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#fcee21",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 24,
            filter: "url(#svgglow)"
          }}
          className="RCwMnecV_4 glow transition--yellow"
        />
        <path
          id="yellow_lite"
          data-name="yellow lite"
          d="M118,427c0-171.74,139.22-311,311-311S740,255.26,740,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#fcffb0",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 9
          }}
          className="RCwMnecV_5"
        />
      </g>
      <g id="green-wrap">
        <path
          id="green"
          data-name="green dark"
          d="M159.31,427c0-148.94,120.75-269.69,269.69-269.69S698.69,278.06,698.69,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#8cc63f",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 24,
            filter: "url(#svgglow)"
          }}
          className="RCwMnecV_6 glow transition--green"
        />
        <path
          id="green_lite"
          data-name="green lite"
          d="M159.31,427c0-148.94,120.75-269.69,269.69-269.69S698.69,278.06,698.69,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#c5fbaa",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 9,
            opacity: 0.8
          }}
          className="RCwMnecV_7"
        />
      </g>
      <g id="blue-wrap">
        <path
          id="blue-wrap"
          data-name="blue dark"
          d="M200,427c0-126.46,102.52-229,229-229S658,300.54,658,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#3fa9f5",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 24,
            filter: "url(#svgglow)"
          }}
          className="RCwMnecV_8 glow transition--blue"
        />
        <path
          id="blue_lite"
          data-name="blue lite"
          d="M200,427c0-126.46,102.52-229,229-229S658,300.54,658,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#aff5fd",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 9,
            opacity: 0.8
          }}
          className="RCwMnecV_9"
        />
      </g>
      <g id="purple-wrap">
        <path
          id="purple"
          data-name="purple dark"
          d="M239.41,427c0-104.71,84.88-189.59,189.59-189.59S618.59,322.29,618.59,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#9500ff",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 24,
            filter: "url(#svgglow)"
          }}
          className="RCwMnecV_10 glow transition--purple"
        />
        <path
          id="purple_lite"
          data-name="purple lite"
          d="M239.41,427c0-104.71,84.88-189.59,189.59-189.59S618.59,322.29,618.59,427"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#d994fd",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 9,
            opacity: 0.8
          }}
          className="RCwMnecV_11"
        />
      </g>
      <g id="pink-wrap">
        <path
          id="pink"
          data-name="pink dark"
          d="M280.62,427a148.38,148.38,0,0,1,296.76,0"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#f0f",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 24,
            filter: "url(#svgglow)"
          }}
          className="RCwMnecV_12 glow transition--pink"
        />
        <path
          id="pink_lite"
          data-name="pink lite"
          d="M280.62,427a148.38,148.38,0,0,1,296.76,0"
          transform="translate(-26.12 -24.12)"
          style={{
            fill: "none",
            stroke: "#faaefc",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 9,
            opacity: 0.8
          }}
          className="RCwMnecV_13"
        />
      </g>
      <style data-made-with="vivus-instant" />
    </svg>
  </div>
);

Rainbow.propTypes = {
  classNamees: PropTypes.object
};

export default Rainbow;
