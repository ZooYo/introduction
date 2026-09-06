#!/usr/bin/env bash
# 一鍵部署：把 result/ 的變更 commit 並推到 GitHub，GitHub Actions 會自動發布到 Pages。
# 用法： ./deploy.sh "改了專案 A 的成果"
set -euo pipefail
cd "$(dirname "$0")"

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "尚未設定 remote，請先執行： git remote add origin git@github.com:ZooYo/introduction.git"; exit 1
fi

git add -A
if git diff --cached --quiet; then
  echo "沒有變更，不需要部署。"; exit 0
fi

# 安全檢查：私人資料不應該被加進來
if git diff --cached --name-only | grep -Eq '^(notion_data|resume|self_prepare)/|^ins$'; then
  echo "偵測到私人資料被加入 commit，已中止。請檢查 .gitignore。"; git reset -q; exit 1
fi

git commit -m "${1:-update introduction}"
git push -u origin main
echo
echo "已推送。GitHub Actions 約 1 分鐘後發布完成："
echo "  進度： https://github.com/ZooYo/introduction/actions"
echo "  網站： https://zooyo.github.io/introduction/"
echo "  英文： https://zooyo.github.io/introduction/?lang=en"
