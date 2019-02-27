import React from 'react';
import { css } from 'emotion';
import { darken } from 'polished';
import { flavours } from '../constants/styleTokens';


const buttonStyle = css(`
  font-size: 1em;
  border: solid 1px #fafafa;
  background-color: ${flavours.default};
  border-radius: 0.1em;
  padding: 0.5em 1em;
  color: #fff;
  font-weight: 100;
  cursor: pointer;
  border-radius: 0.3em;
  &:hover {
    background-color: ${darken(0.05, flavours.default)};
  }
  &:focus {
    outline: 2px solid ${flavours.outline};
  }

  &.secondary {
    background-color: ${flavours.secondary};
    &:hover{
      background-color: ${darken(0.05, flavours.secondary)};
    } 
  }
`);

export const Button = ({
  children = 'Button',
  onClick = () => undefined,
  className = '',
  disabled = false,
  type = 'button',
  flavour = ''
}) => (
    <button
      onClick={onClick}
      className={`${buttonStyle} ${className} ${flavour}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );

