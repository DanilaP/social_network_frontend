export interface IPost {
    _id: string,
    user_id: string,
    text: string,
    files: IFile[],
    likes: ILike[],
    comments: IComment[]
}

interface IFile {
    url: string,
    name: string,
    size: number
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