import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <UserProfile name="John Doe" age={25} bio="Loves traveling and coding" />
      <Counter />
      <Footer />
    </div>
  );
}

export default App;
