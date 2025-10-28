"use client";
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { signUp } from '@/models/user/model';
import { useRouter } from 'next/navigation';
import FormItem from "antd/es/form/FormItem";
import Link from 'next/link';
import styles from '../styles.module.scss';
import userStore from '@/stores/user-store';

interface ISignInForm {
    name: string,
    email: string,
    password: string
};

function SignUp() {

    const [form] = Form.useForm();
    const [isSubmited, setIsSubmited] = useState<boolean>(false);
    const [passVisible, setPassVisible] = useState<boolean>(false);
    const router = useRouter();

    const onFinish = (values: ISignInForm) => {
        signUp(values.name, values.email, values.password)
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
                Регистрация
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >   
                <FormItem
                    name="name"
                    label="Имя"
                    required={false}
                    validateTrigger={isSubmited ? "onChange" : "onSubmit"}
                    rules={[{
                        required: true,
                        message: "Это обязательное поле"
                    }]}
                >
                    <Input placeholder="Введите имя" />
                </FormItem>
                <FormItem
                    name="email"
                    label="Логин"
                    required={false}
                    validateTrigger={isSubmited ? "onChange" : "onSubmit"}
                    rules={[{
                        required: true,
                        message: "Это обязательное поле"
                    }]}
                >
                    <Input placeholder="Введите логин" />
                </FormItem>
                <FormItem
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
                        className='form-input'
                        placeholder="Введите пароль"
                        visibilityToggle={{ visible: passVisible, onVisibleChange: setPassVisible }}
                    />
                </FormItem>
                <FormItem >
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </FormItem>
            </Form>
            <Link className={styles.link} href={"/auth/sign-in"}>Уже есть аккаунт?</Link>
        </div>
    )
}

export default SignUp;
