/// <reference types="react-dom"/>
/// <reference types="react"/>

/**
 * react中需要声明，vue中不需要
 */

declare namespace React {
  interface FallbackHTMLAttributes<T> extends HTMLAttributes<T> {
    text: string
  }

  interface ImpPreviewHTMLAttributes<T> extends HTMLAttributes<T> {
    src: string
  }
}

namespace JSX {
  interface IntrinsicElements {
    'img-preview': React.DetailedHTMLProps<React.ImpPreviewHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    'fall-back': React.DetailedHTMLProps<React.FallbackHTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
