import React, {
  createElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import SmoothScrollbar from 'smooth-scrollbar';
import type {Scrollbar} from 'smooth-scrollbar/scrollbar';
import type {ScrollStatus} from 'smooth-scrollbar/interfaces';

import {ScrollbarProps} from './types';

const SmoothScrollbarReact = forwardRef<Scrollbar, ScrollbarProps>(
  function SmoothScrollbarReact(
    {children, className, style, ...restProps},
    ref
  ) {
    const mountedRef = useRef(false);

    const scrollbar = useRef<Scrollbar>(null!);

    const handleScroll = useCallback(
      (status: ScrollStatus) => {
        if (typeof restProps.onScroll === 'function') {
          restProps.onScroll(status, scrollbar.current);
        }
      },
      [restProps.onScroll]
    );

    const containerRef = useCallback(async node => {
      if (node instanceof HTMLElement) {
        if (restProps.plugins?.overscroll) {
          const {default: OverscrollPlugin} = await import(
            'smooth-scrollbar/plugins/overscroll'
          );
          SmoothScrollbar.use(OverscrollPlugin);
        }

        scrollbar.current = SmoothScrollbar.init(node, restProps);
        scrollbar.current.addListener(handleScroll);

        if (ref) {
          (ref as React.MutableRefObject<Scrollbar>).current =
            scrollbar.current;
        }
      }
    }, []);

    useEffect(() => {
      return () => {
        scrollbar.current.removeListener(handleScroll);
        scrollbar.current.destroy();
      };
    }, []);

    useEffect(() => {
      if (mountedRef.current === true) {
        if (scrollbar.current) {
          Object.keys(restProps).forEach(key => {
            if (!(key in scrollbar.current.options)) {
              return;
            }

            if (key === 'plugins') {
              Object.keys(restProps.plugins).forEach(pluginName => {
                scrollbar.current.updatePluginOptions(
                  pluginName,
                  restProps.plugins[pluginName]
                );
              });
            } else {
              // @ts-ignore
              scrollbar.current.options[key] = restProps[key];
            }
          });

          scrollbar.current.update();
        }
      } else {
        mountedRef.current = true;
      }
    }, [restProps]);

    if (isValidElement(children)) {
      return cloneElement(children, {
        ref: containerRef,
        className:
          (children.props.className ? `${children.props.className} ` : '') +
          className,
        style: {
          ...style,
          ...children.props.style,
        },
      });
    }

    return createElement(
      'div',
      {
        ref: containerRef,
        className,
        style: {
          ...style,
          WebkitBoxFlex: 1,
          msFlex: 1,
          MozFlex: 1,
          flex: 1,
        },
      },
      createElement(
        'div',
        {
          className,
        },
        children
      )
    );
  }
);

export {SmoothScrollbarReact as Scrollbar};
