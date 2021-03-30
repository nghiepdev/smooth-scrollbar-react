import React, {forwardRef, useEffect, useCallback, useRef} from 'react';
import {isElement} from 'react-is';
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

const SmoothScrollbarReact = forwardRef<Scrollbar, ScrollbarProps>(
  function SmoothScrollbarReact(props, ref) {
    const container = useRef<HTMLDivElement>(null!);
    const scrollbar = useRef<Scrollbar>(null!);

    const {children, className, style, onScroll, ...restProps} = props;

    const assignForwardRef = useCallback(() => {
      if (ref) {
        (ref as React.MutableRefObject<Scrollbar>).current = scrollbar.current;
      }
    }, [ref]);

    useEffect(() => {
      scrollbar.current = SmoothScrollbar.init(container.current, restProps);

      const handleScroll = (status: ScrollStatus) => {
        if (typeof onScroll === 'function') {
          onScroll(status, scrollbar.current);
        }
      };

      scrollbar.current.addListener(handleScroll);

      assignForwardRef();

      return () => {
        scrollbar.current.removeListener(handleScroll);
        scrollbar.current.destroy();
        assignForwardRef();
      };
    }, []);

    useEffect(() => {
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
            scrollbar.current.options[key] = restProps[key];
          }
        });

        scrollbar.current.update();

        assignForwardRef();
      }
    }, [restProps, assignForwardRef]);

    const count = React.Children.count(children);

    if (count === 1 && isElement(children)) {
      return React.cloneElement(children, {
        ref: container,
        className:
          (children.props.className ? `${children.props.className} ` : '') +
          className,
        style: {
          ...style,
          ...children.props.style,
        },
      });
    }

    return React.createElement(
      'div',
      {
        ref: container,
        className,
        style: {
          ...style,
          WebkitBoxFlex: 1,
          msFlex: 1,
          MozFlex: 1,
          flex: 1,
        },
      },
      React.createElement(
        'div',
        {
          className: 'scroll-content-inner',
        },
        children
      )
    );
  }
);

export {SmoothScrollbarReact as Scrollbar};
