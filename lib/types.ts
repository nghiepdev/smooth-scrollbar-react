import type {Scrollbar} from 'smooth-scrollbar/scrollbar';
import type {ScrollbarOptions, ScrollStatus} from 'smooth-scrollbar/interfaces';
import type {
  OverscrollOptions,
  OverscrollEffect,
} from 'smooth-scrollbar/plugins/overscroll';

export interface ScrollbarPlugin extends Record<string, unknown> {
  overscroll?: Partial<Omit<OverscrollOptions, 'effect'>> & {
    effect?: OverscrollEffect;
  };
}

export type ScrollbarProps = Partial<ScrollbarOptions> &
  React.PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
    plugins?: ScrollbarPlugin;
    onScroll?: (status: ScrollStatus, scrollbar: Scrollbar | null) => void;
    renderWithContainer?: boolean;
  }>;
