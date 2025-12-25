"use client";
import { IFile } from '@/models/posts/model';
import { CiFileOn } from "react-icons/ci";
import React from 'react';
import styles from './styles.module.scss';

const FileList = (props: {
    files: IFile[]
}) => {
    return (
        <div className={ styles.fileList }>
            {
                props.files.map((file) => {
                    return (
                        <a
                            key={ file.url }
                            href={ file.url }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={ styles.file }
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <CiFileOn className={ styles.fileIcon } fontSize={30} />
                            <div className={ styles.fileName }>{ file.name }</div>
                            <div className={ styles.fileSize }>({ (file.size / 1024 / 1024).toFixed(2) } мб)</div>
                        </a>
                    )
                })
            }
        </div>
    );
};

export default FileList;