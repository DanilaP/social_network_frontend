import { Button, GetProp, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import styles from './styles.module.scss';
import ImgCrop from 'antd-img-crop';
import $api from '@/configs/axios';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const AvatarChanger = (props: {
    close: () => void
}) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
        src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as FileType);
            reader.onload = () => resolve(reader.result as string);
        });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const save = () => {
        if (fileList.length > 0) {
            const formData = new FormData();
            formData.append('user', JSON.stringify({}));
            
            fileList.forEach(file => {
                if (file.originFileObj) {
                    formData.append('files', file.originFileObj);
                }
            });
            $api.post("/user/edit", formData)
            .then(() => {
                props.close();
            })
            .catch(error => {
                console.error(error);
            })
        }
    }

    return (
        <div className={ styles.avatarChanger }>
            <ImgCrop rotationSlider>
                <Upload
                    listType="picture-card"
                    fileList={ fileList }
                    onChange={ onChange }
                    onPreview={ onPreview }
                    maxCount={ 1 }
                >
                    {fileList.length < 5 && '+ Загрузить'}
                </Upload>
            </ImgCrop>
            <Button onClick={ save } type='primary'>Сохранить</Button>
        </div>
    );
};

export default AvatarChanger;