import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Handbook from './pages/Handbook';
import HandbookArticle from './pages/HandbookArticle';
import NotFound from './pages/NotFound';

function App() {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white selection:bg-blue-500/30 transition-colors duration-300">
            {/* Google Analytics — tracks every route change */}
            <Analytics />
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/handbook" element={<Handbook />} />
                <Route path="/handbook/:id" element={<HandbookArticle />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

