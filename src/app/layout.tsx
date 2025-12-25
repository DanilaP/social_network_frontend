"use client";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "@/models/user/model";
import { ConfigProvider } from "antd";
    import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';
import StyledComponentsRegistry from "@/components/partials/antd-registry/antd-registry";
import userStore from "@/stores/user-store";
import ruRu from 'antd/locale/ru_RU';
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


    unstableSetRender((node, container) => {
        container._reactRoot ||= createRoot(container);
        const root = container._reactRoot;
        root.render(node);
        return async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
            root.unmount();
        };
    });
    
    return (
        <html lang="en">
            <body>
                <ConfigProvider 
                    locale={ruRu}
                    theme={{
                        token: {
                            fontFamily: "Nunito"
                        }
                    }}
                >
                    <Provider store={ userStore }>
                        <StyledComponentsRegistry>
                            {children}
                        </StyledComponentsRegistry>
                    </Provider>
                </ConfigProvider>
            </body>
        </html>
    );
}
