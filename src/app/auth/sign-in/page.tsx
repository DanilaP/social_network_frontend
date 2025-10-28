"use client";
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { signIn } from '@/models/user/model';
import { useRouter } from 'next/navigation';
import FormItem from "antd/es/form/FormItem";
import Link from 'next/link';
import styles from '../styles.module.scss';
import userStore from '@/stores/user-store';

interface ISignInForm {
    email: string,
    password: string
};

function SignIn() {

    const [form] = Form.useForm();
    const [isSubmited, setIsSubmited] = useState<boolean>(false);
    const [passVisible, setPassVisible] = useState<boolean>(false);
    const router = useRouter()

    const onFinish = (values: ISignInForm) => {
        signIn(values.email, values.password)
        .then(res => {
            router.push(`/main/user/${ res.data.user._id }`);
            userStore.dispatch({ type: "SET_USER", payload: res.data.user });
        })
        .catch((error) => {
            console.error(error);
        })
    };

    const onFinishFailed = () => {
        setIsSubmited(true);
    };

    return (
        <div className={styles.signinFormContainer}>
            <div className={styles.title}>
                Авторизация
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <FormItem
                    className={styles.blackLabel}
                    name="email"
                    label="Логин"
                    required={false}
                    validateTrigger={isSubmited ? "onChange" : "onSubmit"}
                    rules={[{
                        required: true,
                        message: "Это обязательное поле"
                    }]}
                >
                    <Input className='form-input' placeholder="Введите логин" />
                </FormItem>
                <FormItem
                    className={styles.blackLabel}
                    name="password"
                    label="Пароль"
                    required={false}
                    validateTrigger={isSubmited ? "onChange" : "onSubmit"}
                    rules={[{
                        required: true,
                        message: "Это обязательное поле"
                    }, {
                        type: 'string',
                        min: 6,
                        message: "Длина не менее 6 символов"
                    }]}
                >
                    <Input.Password
                        placeholder="Введите пароль"
                        visibilityToggle={{ visible: passVisible, onVisibleChange: setPassVisible }}
                    />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </FormItem>
            </Form>
            <Link className={styles.link} href={"/auth/sign-up"}>Ещё нет аккаунта?</Link>
        </div>
    )
}

export default SignIn;
