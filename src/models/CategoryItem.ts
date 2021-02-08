import { Moment } from 'moment';

export class CategoryForm {
    public id?: string;
    public title: string;
    public description: string;

    constructor(option: CategoryForm) {
        this.id = option.id;
        this.title = option.title;
        this.description = option.description;
    }
}

export default class CategoryItem {
    public id: number | string;
    public title: string;
    public description: string;
    public createdDate: Moment;
    public updatedDate: Moment;

    constructor(option: CategoryItem) {
        this.id = option.id;
        this.title = option.title;
        this.description = option.description;
        this.createdDate = option.createdDate;
        this.updatedDate = option.updatedDate;
    }
}