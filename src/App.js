import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import LocaleContext from './contexts/LocaleContext';

import './styles/style.css';

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('theme') || 'light'
  });
  const [lang, setLang] = React.useState(() => {
    return localStorage.getItem('lang') || 'id'
  });

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      console.log(data);
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  React.useEffect((prevTheme) => {
    if (prevTheme !== theme) {
      document.querySelector("#root").setAttribute('data-theme', theme);
    }
  }, [theme]);

  const onLoginSuccess = ({ accessToken }) => {
    putAccessToken(accessToken);
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
    });
  }

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }

  const toggleLang = () => {
    setLang((prevLang) => {
      const newLang = prevLang === 'id' ? 'en' : 'id';
      localStorage.setItem('lang', newLang);
      return newLang;
    });
  }

  const localeContextValue = React.useMemo(() => {
    return {
      theme,
      lang,
      toggleTheme,
      toggleLang,
    };
  },[theme, lang])

  if (initializing) {
    return null;
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {
        authedUser === null 
        ?
          <div className="app-container">
            <header>
              <NavBar auth={authedUser}/>
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess}/>}/>
                <Route path="/register" element={<RegisterPage />}/>
              </Routes>
            </main>
          </div> 
        :
          <div className="app-container">
            <header>
              <NavBar auth={authedUser} logout={onLogout} name={authedUser.name}/>
            </header>
            <main>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/buat-catatan" element={<AddPage />}/>
            <Route path="/arsip" element={<ArchivePage />}/>
            <Route path="/detail-catatan/:id" element={<DetailPage />}/>
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
          </main>
          </div>
      }
    </LocaleContext.Provider>
  );
}

export default App;
