import axios from '../core/Axios';
import UserItem, { UserForm } from '../models/UserItem';

export default class UserService {

    private itemToModel = (item: any): UserItem => {
        return new UserItem({
            id: item._id,
            userName: item.userName,
            name: item.name,
            surname: item.surname,
            email: item.email,
            roles: item.roles,
        });
    }

    public getItems = async (): Promise<UserItem[]> => {
        try {
            const ret = await axios.get(`/user`);
            return ret.data.map(this.itemToModel);
        }
        catch(err){
            console.log("[UserService] getItems() Err", err);
            throw new Error();
        }
    }
    
    public create = async (form: UserForm): Promise<UserItem[]> => {
        try {
            const ret = await axios.post(`/user`, form);
            return ret.status === 200 ? await this.getItems() : [];
        }
        catch(err){
            console.log("[UserService] create() Err", err);
            return [];
        }
    }

    public update = async (form: UserForm): Promise<UserItem[]> => {
        try {
            const ret = await axios.patch(`/user/${form.id}`, form);
            return ret.status === 200 ? await this.getItems() : [];
        }
        catch(err){
            console.log("[UserService] update() Err", err);
            return [];
        }
    }

    public delete = async (id: string): Promise<UserItem[]> => {
        try {
            const ret = await axios.delete(`/user/${id}`);
            return ret.status === 200 ? await this.getItems() : [];
        }
        catch(err){
            console.log("[UserService] delete() Err", err);
            return [];
        }
    }
}