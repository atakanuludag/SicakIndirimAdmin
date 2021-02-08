import axios from '../core/Axios';
import Report from '../models/Report';

export default class ReportService {

    public getReport = async (): Promise<Report> => {
        try {
            const ret = await axios.get(`/report`);
            return new Report({
                userCount: ret.data.userCount,
                hotDealCount: ret.data.hotDealCount,
                todayHotDealCount: ret.data.todayHotDealCount,
            })
        }
        catch(err){
            console.log("[ReportService] getReport() Err", err);
            throw new Error();
        }
    }
    
}