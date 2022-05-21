import { useState, useEffect } from 'react';

export enum ScreenWidth {
    DESKTOP = 1500,
    TAB_LAND = 1200,
    TAB_PORT = 900,
    PHONE = 600,
}

const useScreenWidth = () => {
    const [screenMode, setScreenMode] = useState<ScreenWidth>(ScreenWidth.DESKTOP);

    const windowWidth = window.innerWidth;
    useEffect(() => {
        if (windowWidth <= 600) {
            setScreenMode(ScreenWidth.PHONE);
        } else if (windowWidth <= 900) {
            setScreenMode(ScreenWidth.TAB_PORT);
        } else if (windowWidth <= 1200) {
            setScreenMode(ScreenWidth.TAB_LAND);
        } else {
            setScreenMode(ScreenWidth.DESKTOP);
        }
    }, [windowWidth]);

    return { screenMode };
};

export default useScreenWidth;
