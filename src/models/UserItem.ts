export class UserForm {
    public id?: string;
    public userName: string;
    public password: string;
    public name: string;
    public surname: string;
    public email: string;
    public roles: string[];


    constructor(option: UserForm) {
        this.id = option.id;
        this.userName = option.userName;
        this.password = option.password;
        this.name = option.name;
        this.surname = option.surname;
        this.email = option.email;
        this.roles = option.roles;
    }
}

export default class UserItem {
    public id: number | string;
    public userName: string;
    public name: string;
    public surname: string;
    public email: string;
    public roles: string[];

    constructor(option: UserItem) {
        this.id = option.id;
        this.userName = option.userName;
        this.name = option.name;
        this.surname = option.surname;
        this.email = option.email;
        this.roles = option.roles;
    }
}