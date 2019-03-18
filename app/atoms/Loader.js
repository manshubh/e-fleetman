import React from 'react';
import { css } from 'emotion';
import { flavours } from '../constants/styleTokens';

const style = getStyles();

export const Loader = () => (
    <div className={style}>
        <span className="dot"></span>
        <div className="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

function getStyles() {
    return css(`
        align-self: center;
        width: 142px;
        height: 40px;
        margin: -20px 0 0 -71px;
        background: #fff;
        filter: contrast(20);
    
      .dot {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 12px;
        left: 15px;
        filter: blur(4px);
        background: ${flavours.secondary};
        border-radius: 50%;
        transform: translateX(0);
        animation: dot 2.8s infinite;
      }
      .dots {
        transform: translateX(0);
        margin-top: 12px;
        margin-left: 31px;
        animation: dots 2.8s infinite;
      }
      .dots span {
        display: block;
        float: left;
        width: 16px;
        height: 16px;
        margin-left: 16px;
        filter: blur(4px);
        background: ${flavours.secondary};
        border-radius: 50%;
      }
      @-moz-keyframes dot {
        50% {
          transform: translateX(96px);
        }
      }
      @-webkit-keyframes dot {
        50% {
          transform: translateX(96px);
        }
      }
      @-o-keyframes dot {
        50% {
          transform: translateX(96px);
        }
      }
      @keyframes dot {
        50% {
          transform: translateX(96px);
        }
      }
      @-moz-keyframes dots {
        50% {
          transform: translateX(-31px);
        }
      }
      @-webkit-keyframes dots {
        50% {
          transform: translateX(-31px);
        }
      }
      @-o-keyframes dots {
        50% {
          transform: translateX(-31px);
        }
      }
      @keyframes dots {
        50% {
          transform: translateX(-31px);
        }
      }
    `)
}