import { useEffect, useRef } from 'react';

function useLongPolling(callback: () => void, interval: number = 5000) {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }
        const id = setInterval(tick, interval);
        return () => clearInterval(id);
    }, [interval]);
}

export default useLongPolling;

