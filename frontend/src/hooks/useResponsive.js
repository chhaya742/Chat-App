import { useState, useEffect } from "react";

const useResponsive = () => {
    const [size, setSize] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        const updateSize = () => {
            setSize(window?.innerWidth);
        };
        window?.addEventListener('resize', updateSize);
        updateSize();
        size <= 425 && setIsOpen(!isOpen);
        return () => window?.removeEventListener('resize', updateSize);

    }, [size]);

    const toggleList = () => {
        setIsOpen(!isOpen);
    };

    return { size, toggleList,isOpen }
}

export default useResponsive 