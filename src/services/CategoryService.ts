import axios from '../core/Axios';
import CategoryItem, { CategoryForm } from '../models/CategoryItem';
import moment from 'moment';

//Todo: CategoryForm olarak değilde dto olarak değiştirebilirim.

export default class CategoryService {

    private itemToModel = (item: any): CategoryItem => {
        return new CategoryItem({
            id: item._id,
            title: item.title,
            description: item.description,
            createdDate: moment(item.createdDate),
            updatedDate: moment(item.updatedDate)
        });
    }

    public getItems = async (): Promise<CategoryItem[]> => {
        try {
            const ret = await axios.get(`/category`);
            return ret.data.map(this.itemToModel);
        }
        catch(err){
            console.log("CategoryService getItems() Err", err);
            throw new Error();
        }
    }

    public create = async (form: CategoryForm): Promise<boolean> => {
        try {
            const ret = await axios.post(`/category`, form);
            return ret.status === 200 ? true : false;
        }
        catch(err){
            console.log("CategoryService create() Err", err);
            return false;
        }
    }

    public update = async (form: CategoryForm): Promise<boolean> => {
        try {
            const ret = await axios.patch(`/category`, form, {
                params: {
                    id: form.id
                }
            });
            return ret.status === 200 ? true : false;
        }
        catch(err){
            console.log("CategoryService update() Err", err);
            return false;
        }
    }
}