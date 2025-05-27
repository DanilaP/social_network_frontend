"use client";
import { Provider } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserData } from "@/models/user/model";
import StyledComponentsRegistry from "@/partials/antd-registry/antd-registry";
import userStore from "@/stores/user-store";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();

    useEffect(() => {
        getUserData()
        .then(res => {
            userStore.dispatch({ type: "SET_USER", payload: res.data.user });
        })
        .catch(error => {
            router.push("/auth/sign-in");
            console.error(error);
        })
    }, []);

    return (
        <html lang="en">
            <body>
                <Provider store={ userStore }>
                    <StyledComponentsRegistry>
                        {children}
                    </StyledComponentsRegistry>
                </Provider>
            </body>
        </html>
    );
}
