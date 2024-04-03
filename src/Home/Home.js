import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';
import "./../styles/App.css"

function Home() {

  return (
    <>
        <Header />
            <div className="app_body">
                <Sidebar />
                <Feed />
                <Widgets />
            </div>
    </>
  );
}

export default Home;
