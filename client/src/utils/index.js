const options = { year: "numeric", month: "short", day: "numeric" };

export const formatDate = date =>
  new Date(date).toLocaleDateString("en-US", options);

// force focus on #main when using skip navigation link
// (some browsers will only focus form inputs, links, and buttons)
export const skip = targetId => {
  const removeTabIndex = e => {
    e.target.removeAttribute("tabindex");
  };
  const skipTo = document.getElementById(targetId);
  // Setting 'tabindex' to -1 takes an element out of normal
  // tab flow but allows it to be focused via javascript
  skipTo.tabIndex = -1;
  skipTo.focus(); // focus on the content container
  // console.log(document.activeElement);
  // when focus leaves this element,
  // remove the tabindex attribute
  skipTo.addEventListener("blur", removeTabIndex);
};

const getRGBValues = str =>
  str.substring(str.indexOf("(") + 1, str.length - 1).split(", ");

const componentToHex = c => {
  const hex = Number(c).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

const rgbToHex = (r, g, b) =>
  `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

const getStyle = (element, property) =>
  window.getComputedStyle
    ? window.getComputedStyle(element, null).getPropertyValue(property)
    : element.style[
        property.replace(/-([a-z])/g, function(g) {
          return g[1].toUpperCase();
        })
      ];

export const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "magenta"
];

const colorHexCodes = {
  "#ff00ff": "magenta",
  "#9500ff": "purple",
  "#35a9f5": "blue",
  "#8cc63f": "green",
  "#fcee21": "yellow",
  "#ff931e": "orange",
  "#ff0000": "red"
};

export const glowColorName = el => {
  const rgb = getStyle(el, "background-color");
  const r = getRGBValues(rgb)[0];
  const g = getRGBValues(rgb)[1];
  const b = getRGBValues(rgb)[2];
  const hex = rgbToHex(r, g, b);
  return colorHexCodes[hex];
};
