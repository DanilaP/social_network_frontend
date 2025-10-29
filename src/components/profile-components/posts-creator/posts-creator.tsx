import { Button, Form, Upload, UploadFile, UploadProps } from 'antd';
import { MdOutlineCloudUpload } from "react-icons/md";
import { Dispatch, SetStateAction, useState } from 'react';
import { IPost } from '@/models/posts/model';
import styles from './styles.module.scss';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import $api from '@/configs/axios';

interface IPostForm {
    text: string
};

const PostsCreator = (props: {
    close: () => void,
    setPosts: Dispatch<SetStateAction<IPost[] | undefined>>
}) => {
    const [form] = Form.useForm();
    const [isSubmited, setIsSubmited] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onFinish = (values: IPostForm) => {
        const formData = new FormData();
        formData.append('text', values.text);
        
        fileList.forEach(file => {
            if (file.originFileObj) {
                formData.append('files', file.originFileObj);
            }
        });

        $api.post("/post", formData)
        .then((res) => {
            props.close();
            props.setPosts((prev: IPost[] | undefined) => 
                prev ? [...prev, res.data.post] : [res.data.post]
            );
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinishFailed = () => {
        setIsSubmited(true);
    }; 

    return (
        <div className={ styles.postsCreator }>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <FormItem
                    name="text"
                    label="Текст поста"
                    required={false}
                    validateTrigger={isSubmited ? "onChange" : "onSubmit"}
                    rules={[{
                        required: true,
                        message: "Это обязательное поле"
                    }]}
                >
                    <TextArea className={ styles.textArea } placeholder="Текст поста" />
                </FormItem>
                <FormItem>
                    <Upload
                        multiple
                        fileList={fileList}
                        onChange={handleChange}
                        beforeUpload={() => false}
                        listType="picture"
                    >
                        <Button type="primary" icon={<MdOutlineCloudUpload />}>
                            Добавить файл
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem className={ styles.formSubmit }>
                    <Button type="primary" htmlType="submit">
                        Создать пост
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
};

export default PostsCreator;