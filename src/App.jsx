// CSS
import './styles/reset.css';
import './styles/base.css';

// Package
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import {
  AdminLoginPage,
  AdminUsersPage,
  AdminTweetsPage,
  FollowersPage,
  FollowingPage,
  LoginPage,
  MainPage,
  RegisterPage,
  SettingPage,
  TweetPage,
  UserLikesPage,
  UserMainPage,
  UserReplysPage,
  NoMatch,
} from './pages';
import TwoBarsLayout from 'components/layouts/TwoBarsLayout';
import { TweetContextProvider } from 'contexts/TweetContext';
import { InfoContextProvider } from 'contexts/InfoContext';
import { AdminContextProvider } from 'contexts/AdminContext';
import AdminLayout from 'components/layouts/AdminLayout';

const basename = import.meta.env.VITE_PUBLIC_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <InfoContextProvider>
        <TweetContextProvider>
          <AdminContextProvider>
            <Routes>
              <Route path="admin">
                <Route index element={<AdminLoginPage />} />
                <Route element={<AdminLayout />}>
                  <Route path="users" element={<AdminUsersPage />} />
                  <Route path="tweets" element={<AdminTweetsPage />} />
                </Route>
              </Route>

              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="setting" element={<SettingPage />} />

              <Route element={<TwoBarsLayout />}>
                <Route path="main" element={<MainPage />} />
                <Route path="tweet/:id" element={<TweetPage />} />
                <Route path="user/:id">
                  <Route index element={<UserMainPage />} />
                  <Route path="replys" element={<UserReplysPage />} />
                  <Route path="likes" element={<UserLikesPage />} />
                  <Route path="followers" element={<FollowersPage />} />
                  <Route path="following" element={<FollowingPage />} />
                </Route>
              </Route>

              {/* * 代表除了以上設定好的路由，其他字串不符合的會被導引到 NoMatch */}
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </AdminContextProvider>
        </TweetContextProvider>
      </InfoContextProvider>
    </BrowserRouter>
  );
}

export default App;
