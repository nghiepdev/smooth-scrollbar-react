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
import {Scrollbar} from 'smooth-scrollbar/scrollbar';
import {ScrollbarOptions, ScrollStatus} from 'smooth-scrollbar/interfaces';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

SmoothScrollbar.use(OverscrollPlugin);

export type ScrollbarProps = Partial<ScrollbarOptions> &
  React.PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
    onScroll?: (status: ScrollStatus, scrollbar: Scrollbar | null) => void;
  }>;

const SmoothScrollbarReact = forwardRef<Scrollbar | undefined, ScrollbarProps>(
  function SmoothScrollbarReact(
    {children, className, style, ...restProps},
    ref
  ) {
    const scrollbar = useRef<Scrollbar>(null!);

    const handleScroll = useCallback(
      (status: ScrollStatus) => {
        if (typeof restProps.onScroll === 'function') {
          restProps.onScroll(status, scrollbar.current);
        }
      },
      [restProps.onScroll]
    );

    const containerRef = useCallback(node => {
      if (node instanceof HTMLElement) {
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
