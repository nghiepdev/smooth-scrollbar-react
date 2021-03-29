import React, {forwardRef, useEffect, useRef} from 'react';
import {isElement} from 'react-is';
import SmoothScrollbar from 'smooth-scrollbar';
import {Scrollbar} from 'smooth-scrollbar/scrollbar';
import {ScrollbarOptions, ScrollStatus} from 'smooth-scrollbar/interfaces';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

SmoothScrollbar.use(OverscrollPlugin);

export type ScrollbarProps = Partial<ScrollbarOptions> &
  React.PropsWithChildren<{
    className?: string;
    onScroll?: (status: ScrollStatus, scrollbar: Scrollbar | null) => void;
  }>;

const SmoothScrollbarReact = forwardRef<Scrollbar, ScrollbarProps>(
  function SmoothScrollbarReact(props, _ref) {
    const container = useRef<HTMLDivElement>(null!);

    let ref: React.MutableRefObject<Scrollbar> = _ref as any;

    const {onScroll, children, ...restProps} = props;

    useEffect(() => {
      const scrollbar = SmoothScrollbar.init(container.current, restProps);

      if (ref) {
        (ref as React.MutableRefObject<Scrollbar>).current = scrollbar;
      } else {
        ref = {
          current: scrollbar,
        };
      }

      const handleScroll = (status: ScrollStatus) => {
        if (typeof onScroll === 'function') {
          onScroll(status, ref.current);
        }
      };

      ref.current.addListener(handleScroll);

      return () => {
        ref.current.removeListener(handleScroll);
        ref.current.destroy();
      };
    }, []);

    useEffect(() => {
      Object.keys(props).forEach(key => {
        if (!(key in ref.current.options)) {
          return;
        }

        if (key === 'plugins') {
          Object.keys(props.plugins).forEach(pluginName => {
            ref.current.updatePluginOptions(
              pluginName,
              props.plugins[pluginName]
            );
          });
        } else {
          ref.current.options[key] = props[key];
        }
      });

      ref.current.update();
    }, [props]);

    const count = React.Children.count(children);

    if (count === 1 && isElement(children)) {
      return React.cloneElement(children, {
        ...restProps,
        ref: container,
      });
    }

    return React.createElement(
      'div',
      {
        ...restProps,
        ref: container,
        style: {
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
