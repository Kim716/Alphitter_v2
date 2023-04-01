# AC Simple Twitter

## :sparkles: 專案介紹

本專案為 ALPHA Camp 學期 3 的團體專案，是一個類似於 Twitter 的社群網站，由兩位前端、兩位後端成員共同開發，現階段僅支援電腦版。

:arrow_right: 網站 [Demo](https://kim716.github.io/ac_twitter/login)

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

1️⃣ 請先確認已安裝 Node.js、npm。

2️⃣ 請在終端機輸入 
```
git clone https://github.com/Kim716/ac_twitter.git
```

3️⃣ 在終端機打開本專案資料夾，並輸入 `npm install` 安裝必要套件。

4️⃣ 在終端機輸入 `npm run start` 啟動本專案，如果看到 `webpack compiled successfully` 代表啟動成功。

5️⃣ 啟動成功會自動跳轉到瀏覽器上，進入本專案。

6️⃣ 隨時可以在終端機輸入 `ctrl + c` 停止專案運行。

## ⚙️ 開發環境與工具

- Create React App 5.0.1
- Node.js 14.16.0
- Npm 6.14.18
- React 18.2.0
- React-dom 18.2.0
- React-router-dom 6.9.0
- Styled-components 5.3.9
- Sweetalert2 11.7.3
- Axios  1.3.4
- Bootstrap 5.2.3
- gh-pages  4.0.0

## 👥 Contributors

前端：[Jamie](https://github.com/violet120)、[Kim](https://github.com/Kim716)

後端：[Lily](https://github.com/Lilynews)、[Noelle](https://github.com/Noelle-KH)
