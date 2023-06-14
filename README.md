# AC Simple Twitter_v2

## :sparkles: 專案介紹

本專案承襲[第一版本](https://github.com/Kim716/ac_twitter)做畫面、功能、程式碼的優化，
詳細的優化狀況可查看 [Pull Request](https://github.com/Kim716/Alphitter_v2/pulls?q=is%3Apr+is%3Aclosed) 中的敘述。

:arrow_right: 網站 [Demo](https://kim716.github.io/Alphitter_v2/login)

:arrow_right: 後端 [Repo](https://github.com/Noelle-KH/twitter-api-2023)

可使用的測試帳號：

|  角色      | 帳號       | 密碼  |
|  :------:  | :------:  | :------:  |
| 前台使用者  | user1     | 12345678 |
| 後台管理者  | root      | 12345678 |
</br>

**前台登入後首頁畫面** </br>
<img src="/src/assets/images/userHomeImage.png" width="500" alt="前台首頁畫面"/>

</br>

**後台登入後首頁畫面** </br>
<img src="/src/assets/images/adminHomeImage.png" width="500" alt="後台首頁畫面"/>

## 🔍 專案功能

- 前台功能
    - 登入 / 註冊
        - 註冊個人使用的帳號。
        - 輸入帳號、密碼登入網站。
    - 首頁
        - 發送個人推文，瀏覽所有使用者的推文。
        - 對推文點 Like/Unlike 或回覆。
        - 瀏覽指定推文的所有回覆內容、回覆數以及被點 Like 的數量。
        - 可以進行跟隨/不跟隨其他使用者。
        - 瀏覽本網站前 10 位推薦跟隨的使用者。
    - 個人資料頁
        - 使用者可以瀏覽個人介紹、發送過的所有推文、回覆以及喜歡的推文內容。
        - 使用者可以編輯個人資料頁中的背景、頭像、用戶暱稱以及自介，讓其他使用者更認識你。
        - 使用者可以瀏覽其他使用者的個人資料頁，包含此使用者發送過的所有推文、回覆以及喜歡的推文內容。
        - 使用者可以瀏覽跟隨自己的其他使用者名單、自己正在跟隨其他使用者的名單。
    - 設定頁
        - 可以修改註冊的帳號、暱稱、E-mail。

- 後台功能
    - 登入
        - 僅管理者帳號可以登入
    - 推文清單
        - 瀏覽本網站所有使用者的推文並刪除推文。
    - 使用者列表
        - 瀏覽本網站所有使用者的詳細資訊，如：使用者帳號、暱稱、個人資料頁的背景、頭像、發推文數、被Like數、被跟隨/正在跟隨數等。

## 📌 在本地端使用專案

1. 請先確認有安裝 Node.js 與 npm

2. 將專案 clone 到本地，在終端機輸入：

   ```
   $ git clone https://github.com/Kim716/Alphitter_v2.git
   ```

3. 透過終端機進入資料夾，並輸入：

   ```
   $ npm install
   ```

4. 安裝完畢後，繼續輸入：

   ```
   $ npm start
   ```

5. 若在最末行看見此訊息則代表順利運行，且瀏覽器會自動進入本專案網站

   ```
   webpack compiled successfully
   ```

6. 若欲暫停使用，請按下：`ctrl + c`

## ⚙️ 開發環境與工具

- Vite 4.3.9
- Node.js 16.20.0
- Npm 8.19.4
- React 18.2.0
- React-dom 18.2.0
- React-router-dom 6.9.0
- Styled-components 5.3.9
- Sweetalert2 11.7.3
- Axios 1.3.4
- gh-pages  4.0.0
- TailwindCSS 3.3.1
- prop-types 15.8.1
- tailwind-merge 1.12.0
- classnames 2.3.2

## 👥 Contributors

前端：[Jamie](https://github.com/violet120)、[Kim](https://github.com/Kim716)

後端：[Lily](https://github.com/Lilynews)、[Noelle](https://github.com/Noelle-KH)
