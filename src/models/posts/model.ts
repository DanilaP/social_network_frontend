export interface IPost {
    _id: string,
    user_id: string,
    date: string,
    text: string,
    files: IFile[],
    likes: ILike[],
    comments: IComment[]
}

export interface IFile {
    url: string,
    name: string,
    size: number,
    type: string
}

interface IComment {
    user_id: string,
    avatar: string,
    name: string,
    text: string,
    files: IFile[],
    likes: ILike[]
}

interface ILike {
    user_id: string,
    avatar: string,
    name: string,
}