import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const location = useLocation();
    const pathName = location.pathname;

    const onScroll = () => {
        if (typeof window === 'object') window.scrollTo(0, 0);
    };

    useEffect(() => {
        onScroll();
        return () => {};
    }, [pathName]);

    return null;
}

export default ScrollToTop;
