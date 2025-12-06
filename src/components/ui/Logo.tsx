import type { FC } from 'react';

const Logo: FC = () => {
    return (
        <img
            className="w-20 h-20 aspect-auto absolute top-2 left-2"
            src="images/logo.png"
            alt="Logo"
        />
    );
};

export default Logo;
