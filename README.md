# introduction

面試自我介紹網頁。線上版：https://zooyo.github.io/introduction/ （英文：`?lang=en`）

- `result/`：網站本體（GitHub Pages 發布的就是這個資料夾），文字內容在 `result/content/*.js`。
- `deploy.sh`：改完內容後執行 `./deploy.sh "說明"`，會 commit、push，GitHub Actions 自動發布。
- `self_prepare/`、`resume/`、`notion_data/`：本機私人資料，已在 `.gitignore` 排除，不會上傳。

詳細說明見 `result/README.md`。
