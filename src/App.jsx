// CSS
import "./styles/reset.css";
import "./styles/base.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";

// Package
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
} from "./pages";
import { TweetContextProvider } from "contexts/TweetContext";
import { InfoContextProvider } from "contexts/InfoContext";
import { AdminContextProvider } from "contexts/AdminContext";

const basename = process.env.PUBLIC_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <InfoContextProvider>
        <TweetContextProvider>
          <AdminContextProvider>
            <Routes>
              <Route path="admin">
                <Route index element={<AdminLoginPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="tweets" element={<AdminTweetsPage />} />
              </Route>

              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="setting" element={<SettingPage />} />
              <Route path="main" element={<MainPage />} />
              <Route path="tweet/:id" element={<TweetPage />} />

              <Route path="user/:id">
                <Route index element={<UserMainPage />} />
                <Route path="replys" element={<UserReplysPage />} />
                <Route path="likes" element={<UserLikesPage />} />
                <Route path="followers" element={<FollowersPage />} />
                <Route path="following" element={<FollowingPage />} />
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
