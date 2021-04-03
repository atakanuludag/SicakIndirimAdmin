import React from 'react';

const AxiosInterceptorMessage = (message: string, responseMessage?: string, statusCode?: number): React.ReactNode => {
    return (
        <div>
            <strong>{message}</strong><br />
            {responseMessage && <div><strong>Mesaj:</strong> {responseMessage}<br /></div>}
            {statusCode && <div><strong>Kod:</strong> {statusCode}<br /></div>}
        </div>
    )
}

export default AxiosInterceptorMessage;