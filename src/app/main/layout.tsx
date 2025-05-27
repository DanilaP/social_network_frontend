"use client";
import MenuWrapper from "@/components/menu-wrapper/menu-wrapper";
import styles from './styles.module.scss';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <MenuWrapper />
            <div className={ styles.mainWrapper }>
                {children}
            </div>
        </>
    );
}
