/// <reference types="@docusaurus/module-type-aliases" />

declare module '@theme/Heading' {
    import type { ComponentProps } from 'react';

    export interface HeadingProps extends ComponentProps<'h1'> {
        as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }

    export default function Heading(props: HeadingProps): JSX.Element;
}

declare module '@theme/Layout' {
    import type { ReactNode } from 'react';

    export interface LayoutProps {
        children?: ReactNode;
        title?: string;
        description?: string;
        noFooter?: boolean;
        wrapperClassName?: string;
        pageClassName?: string;
    }

    export default function Layout(props: LayoutProps): JSX.Element;
}
