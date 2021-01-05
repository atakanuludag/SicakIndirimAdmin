import axios from '../core/Axios';
import CategoryItem from '../models/CategoryItem';
import moment from 'moment';

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
            return [];
        }
    }
}