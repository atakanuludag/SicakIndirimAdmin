class Alerts {

    private settings = {};
    private snackbar: Function;

    constructor(enqueueSnackbar: Function){
        this.snackbar = enqueueSnackbar;
    }
    
    public errorAlert = (message: string) => {
        this.snackbar(message, { variant: "error", ...this.settings });
    };
    
    public warningAlert = (message: string) => {
        this.snackbar(message, { variant: "warning", ...this.settings });
    };
    
    public successAlert = (message: string) => {
        this.snackbar(message, { variant: "success", ...this.settings });
    };
}

export default Alerts;
