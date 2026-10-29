import type { Component } from '../../shared/lib/components/types.js';

type MainContentProps = {
    children: Component[];
};

const MainContent: Component<MainContentProps> = ({ children }) => {
    if (!Array.isArray(children)) { 
        throw new Error('MainContent must be an array of children');
    }

    return `
        <main class="content">
            ${children.map((child) => child({})).join('')}
        </main>
    `;
};

export default MainContent;
