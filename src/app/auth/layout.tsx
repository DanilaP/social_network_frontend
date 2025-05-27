"use client";
import { MdExitToApp } from "react-icons/md";
import styles from './styles.module.scss';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.authWrapper}>
            <div className={styles.authForm}>
                <div className={styles.authFormHeader}>
                    <MdExitToApp fontSize={36} color='primary' />
                </div>
                <div className={styles.authFormContent}>{ children }</div>
                <div className={styles.authFormFooter}>
                
                </div>
            </div>
        </div>
    );
}
