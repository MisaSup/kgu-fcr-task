import type { FC, ReactNode } from 'react';

type MainContentProps = {
    children: ReactNode;
};

const MainContent: FC<MainContentProps> = ({ children }) => {
    return <main className="content">{children}</main>;
};

export default MainContent;
