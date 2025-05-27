"use client";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "@/models/user/model";
import StyledComponentsRegistry from "@/components/antd-registry/antd-registry";
import userStore from "@/stores/user-store";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    useEffect(() => {
        getUserData()
        .then(res => {
            userStore.dispatch({ type: "SET_USER", payload: res.data.user });
        })
        .catch(error => {
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
