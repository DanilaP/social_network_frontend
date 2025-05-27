"use client";
import { useSelector } from "react-redux";
import { UserStore } from "@/stores/user-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {

    const user = useSelector((store: UserStore) => store.user);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push(`/main/user/${ user._id }`)
        }
    }, [user]);

    return (
        <div className={styles.page}>
            
        </div>
    );
}
