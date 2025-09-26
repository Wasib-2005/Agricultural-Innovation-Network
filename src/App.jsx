import { Outlet } from 'react-router';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
const App = () => {
  return (
    <div className='bg-gradient-to-br from-lime-100 to-lime-300 w-full min-h-screen '>
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default App;
