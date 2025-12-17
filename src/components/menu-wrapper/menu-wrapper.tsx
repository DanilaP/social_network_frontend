"use client";
import { GiExitDoor } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { logout } from "@/models/user/model";
import { IoPeopleCircle } from "react-icons/io5";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BiSolidMessageRounded } from "react-icons/bi";
import userStore, { UserStore } from "@/stores/user-store";
import styles from './styles.module.scss';

const MenuWrapper = () => {

    const user = useSelector((store: UserStore) => store.user);
    const router = useRouter();

    const exit = () => {
        logout()
        .then(() => {
            router.push("/auth/sign-in");
            userStore.dispatch({ type: "SET_USER", payload: null });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return (
        <div className={ styles.menu }>
            <div onClick={ () => router.push(`/main/user/${ user?._id }`) } className={ styles.item }>
                <FaUserCircle className={ styles.icon } />
                Профиль
            </div>
            <div onClick={ exit } className={ styles.fixedItem }>
                <FaUserFriends className={ styles.icon } />
                Друзья
            </div>
            <div onClick={ exit } className={ styles.fixedItem }>
                <BiSolidMessageRounded  className={ styles.icon } />
                Сообщения
            </div>
            <div onClick={ () => router.push("/main/users") } className={ styles.item }>
                <IoPeopleCircle className={ styles.icon } />
                Люди
            </div>
            <div onClick={ exit } className={ styles.fixedItem }>
                <GiExitDoor className={ styles.icon } />
                Выход
            </div>
        </div>
    );
};

export default MenuWrapper;