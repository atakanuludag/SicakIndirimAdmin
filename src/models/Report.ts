export default class Report {
    public userCount: number;
    public hotDealCount: number;
    public todayHotDealCount: number;

    constructor(option: Report) {
        this.userCount = option.userCount;
        this.hotDealCount = option.hotDealCount;
        this.todayHotDealCount = option.todayHotDealCount;
    }
}