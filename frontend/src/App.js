
import Header from './Components/Header';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin'; 
import FindPeople from './Pages/FindPeople'; 
import MyProfile from './Pages/MyProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfileImage from './Pages/ProfileImage';
import Bio from './Pages/Bio';
import CreatePost from './Pages/CreatePost';
import Posts from './Pages/Posts';
import PeopleProfile from './Pages/PeopleProfile'
function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <header className="App-header">
          <Header />
        </header>
        <main>

          <Routes>
            <Route path = '/' element = {<Signup/>}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/uploadProfilePic' element={<ProfileImage />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/bio' element={<Bio />} />
            <Route path='/createPost' element={<CreatePost />} />
            <Route path='/profile' element={<MyProfile />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/people' element={<FindPeople />} />
            <Route path={`/people/:_id/:firstName+:lastName`} element={<PeopleProfile />} />
          </  Routes>

        </main>
        {/* <div className='bg-green-500 absolute bottom-0 right-0 left-0 top-[4rem]'>
        ye hai mera screen vro
      </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
