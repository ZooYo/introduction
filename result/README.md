# 面試自我介紹網頁

純靜態網站，不需要 build，直接推上 GitHub Pages 就能用。

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 唯一入口，右上角可切換 中文 / EN 與 深色 / 淺色 |
| `en.html` | 轉址到 `index.html?lang=en`，給只想分享英文版時用 |
| `content/zh.js` / `content/en.js` | **所有文字內容都在這裡**，要改內容只改這兩個檔 |
| `assets/style.css` | 顏色、字型、版面 |
| `assets/app.js` | 把內容渲染成投影片、鍵盤操作，不用動 |

## 本機預覽

直接用瀏覽器打開 `index.html` 即可（雙擊或拖進 Chrome）。

操作：`→` / `←` / 空白鍵切換頁面，`1`–`6` 跳到指定頁，`F` 全螢幕，`L` 切換語言，`D` 切換深色 / 淺色（右上角也有按鈕）。
語言與主題的選擇會記在瀏覽器裡；網址也可以直接指定：`?lang=en`、`?theme=dark`。

## 改內容

打開 `content/zh.js`（或 `en.js`），每一頁是 `slides` 陣列裡的一個物件：

- `type: "cover"`：封面
- `type: "about"`：關於我（`stats`、`highlights`、`timeline`、`skills`）
- `type: "project"`：專案頁（`problem` / `solution` / `result` / `flow` / `stat`）
- `type: "closing"`：結尾

文字裡可以用 `**粗體**` 和 `` `程式碼` ``。要多加一個專案，複製一個 `type: "project"` 的物件貼在後面、改 `id` 即可，導覽點和頁碼會自動更新。

## 部署到 GitHub Pages

repo：https://github.com/ZooYo/introduction （git 的根目錄是上一層，不是這個資料夾）

- 推到 `main` 後，`.github/workflows/deploy.yml` 會自動把 `result/` 發布到 Pages。
- 網址：https://zooyo.github.io/introduction/ ，英文版 https://zooyo.github.io/introduction/?lang=en
- 第一次若 Actions 顯示 Pages 未啟用：到 repo **Settings → Pages → Source** 選 **GitHub Actions**，再到 Actions 頁面 Re-run 即可。

之後更新，在上一層目錄執行：

```bash
./deploy.sh "更新專案 A 的數據"
```

## 給面試官的分享方式

- 直接給網址，對方用瀏覽器打開即可，手機也能看（會變成直向捲動）。
- 面試時建議自己開 `F` 全螢幕分享畫面，用方向鍵翻頁。
- 這個資料夾**不包含**講稿，講稿在上一層的 `self_prepare/`，已被 `.gitignore` 排除，不會被公開。
