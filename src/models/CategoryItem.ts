import { Moment } from 'moment';

export class CategoryForm {
    id?: string;
    title: string;
    description: string;

    constructor(option: CategoryForm) {
        this.id = option.id;
        this.title = option.title;
        this.description = option.description;
    }
}

export default class CategoryItem {
    id: number | string;
    title: string;
    description: string;
    createdDate: Moment;
    updatedDate: Moment;

    constructor(option: CategoryItem) {
        this.id = option.id;
        this.title = option.title;
        this.description = option.description;
        this.createdDate = option.createdDate;
        this.updatedDate = option.updatedDate;
    }
}