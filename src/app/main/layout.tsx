"use client";
import { IoLogoEdge } from "react-icons/io5";
import { useSelector } from "react-redux";
import { UserStore } from "@/stores/user-store";
import { FaChevronDown } from "react-icons/fa";
import MenuWrapper from "@/components/partials/menu-wrapper/menu-wrapper";
import styles from './styles.module.scss';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    const user = useSelector((store: UserStore) => store.user);

    return (
        <div className={ styles.layoutWrapper }>
            <div className={ styles.mainHeader }>
                <div className={ styles.projectName }>SOCIAL_NETWORK</div>
                <div className={ styles.mainHeaderAvatarWrapper }>
                    <img className={ styles.mainHeaderUserAvatar } src = { user?.avatar } />
                    <FaChevronDown fontSize={ 15 } />
                </div>
            </div>
            <MenuWrapper />
            <div className={ styles.mainWrapper }>
                { children }
            </div>
        </div>
    );
}
