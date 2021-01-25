import { toast, ToastOptions } from 'react-toastify';

class Alerts {

    private settings: ToastOptions = {
        position: "bottom-center"
    }
    
    public errorAlert = (message: string) => {
        toast.error(message, this.settings);
    };
    
    public warningAlert = (message: string) => {
        toast.warning(message, this.settings);
    };
    
    public successAlert = (message: string) => {
        toast.success(message, this.settings);
    };
}

export default new Alerts();
