import { useEffect, useRef } from 'react';
import { AxiosInstance } from 'axios';

function useAbortController(axiosInstance: AxiosInstance) {
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        abortControllerRef.current = new AbortController();

        axiosInstance.defaults.signal = abortControllerRef.current.signal;

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [axiosInstance]);

    const cancelRequest = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    return { cancelRequest, axiosInstance };
}

export default useAbortController;
