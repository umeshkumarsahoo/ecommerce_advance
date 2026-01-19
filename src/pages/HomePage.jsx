import React, { useState } from 'react';

import ScrollProvider from '../components/ScrollProvider';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Story from '../components/Story';
import Journal from '../components/Journal';
import Showcase from '../components/Showcase';
import Collection from '../components/Collection';
import Footer from '../components/Footer';

/**
 * HomePage Component
 * Main landing page with all sections
 */
function HomePage() {
    const [loaded, setLoaded] = useState(false);

    return (
        <ScrollProvider>
            <div className="App">
                {/* Luxury Preloader */}
                {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

                {/* Main Site */}
                <Navbar />
                <main>
                    <Hero />
                    <Story />
                    <Journal />
                    <Showcase />
                    <Collection />
                </main>
                <Footer />
            </div>
        </ScrollProvider>
    );
}

export default HomePage;
