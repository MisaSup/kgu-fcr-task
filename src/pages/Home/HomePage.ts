import Header from "../../widgets/Header/Header.js";
import Navigation from "../../widgets/Navigation/Navigation.js";
import MainContent from "../../widgets/MainContent/MainContent.js";
import Footer from "../../widgets/Footer/Footer.js";
import ProfileSection from "./ProfileSection/ProfileSection.js";
import TeamsSection from "./TeamsSection/TeamsSection.js";
import type { Component } from "../../shared/lib/components/types.js";

const HomePage: Component = () => {
    return `
        ${Header({})}
        ${Navigation({})}
        ${MainContent({
            children: [
                ProfileSection,
                TeamsSection,
            ]
        })}
        ${Footer({})}
    `;
};

export default HomePage;
