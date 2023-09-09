export namespace UserNS {

    export interface User {
        id: string,
        userName: string,
        email: string
        password: string,
        createdAt: Date,
        role: 'user' | 'admin' | 'editor'
    }

    export interface Role {
        id: number,
        name: 'user' | 'admin' | 'editor',
        permission: number
    }
    export interface Permission {
        id: number,
        name: 'create_post' | 'edit_user' | 'delete_comment',
    }

}