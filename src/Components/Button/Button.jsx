import React from 'react';
import { Button } from 'reactstrap';

function ButtonComponent({
  color = 'primary',
  size = 'md',
  loading,
  title,
  onClick,
  onBlur,
  outline,
  active,
  block,
  className,
  disabled,
}) {
  return (
    <Button
      color={color}
      size={size}
      onClick={onClick}
      outline={outline}
      active={active}
      block={block}
      className={className}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}

export default ButtonComponent;
