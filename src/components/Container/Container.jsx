import React from "react";
import PropTypes from "prop-types";

const Container = ({
  children,
  maxWidth = "7xl",
  paddingX = "4",
  paddingY = "0",
  className = "",
  as: Component = "div",
  ...props
}) => {
  // Map Tailwind's max-width scale to actual max-width values
  const maxWidthMap = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={`
        w-full
        mx-auto
        ${maxWidthMap[maxWidth] || maxWidthMap["7xl"]}
        ${paddingX ? `px-${paddingX}` : "px-0"}
        ${paddingY ? `py-${paddingY}` : "py-0"}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf([
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "full",
  ]),
  paddingX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export default Container;
