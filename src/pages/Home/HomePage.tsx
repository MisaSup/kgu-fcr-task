import Header from '../../widgets/Header/Header.js';
import Navigation from '../../widgets/Navigation/Navigation.js';
import MainContent from '../../widgets/MainContent/MainContent.js';
import Footer from '../../widgets/Footer/Footer.js';
import ProfileSection from './ProfileSection/ProfileSection.js';
// TODO: uncomment together with <TeamsSection /> below
// import TeamsSection from './TeamsSection/TeamsSection.js';
import type { FC } from 'react';

const HomePage: FC = () => {
    return (
        <>
            <Header />
            <Navigation />
            <MainContent>
                <ProfileSection />
                {/* TODO: uncomment after migrating TeamsSection to React */}
                {/* <TeamsSection /> */}
            </MainContent>
            <Footer />
        </>
    );
};

export default HomePage;
