import React from 'react';
import { toast } from 'react-toastify';

const AxiosInterceptorMessage = (message: string, responseMessage?: string, statusCode?: number): React.ReactNode => (
    toast.error(
        <div>
            <strong>{message}</strong><br />
            {responseMessage && <div><strong>Mesaj:</strong> {responseMessage}<br /></div>}
            {statusCode && <div><strong>Kod:</strong> {statusCode}<br /></div>}
        </div>,
    { 
        position: "bottom-center",
        //onClose: () => window.location.href = '/dashboard'
    })
)

export default AxiosInterceptorMessage;