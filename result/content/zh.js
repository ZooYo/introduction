/* ------------------------------------------------------------
   中文版內容。改這個檔案就能改畫面上的文字，不用動 HTML / JS。
   語法：**粗體**、`程式碼`
   ------------------------------------------------------------ */
window.INTRO_CONTENTS = window.INTRO_CONTENTS || {};
window.INTRO_CONTENTS.zh = {
  lang: "zh-Hant",
  meta: {
    name: "Luke Hsiao",
    role: "Senior Backend Engineer",
    pageTitle: "蕭祖佑 Luke Hsiao｜自我介紹",
  },
  labels: {
    problem: "問題", solution: "解法", result: "成果",
    minutes: "分鐘", seconds: "秒",
    pickerBtn: "專案", pickerTitle: "選擇要講的專案",
    pickerHint: "勾選並排序，會即時反映在簡報中。選擇會記住，也會寫進網址，可依公司各存一個連結。",
    pickerTotal: "已選", pickerReset: "恢復預設", pickerCopy: "複製這組連結", pickerCopied: "已複製 ✓",
  },
  // 預設要講的專案與順序（可在畫面右上角「專案」按鈕重新勾選）
  defaultProjects: ["project-a", "project-b", "project-c"],
  // 自我介紹 + 結尾大約需要的分鐘數（用來估算總時間）
  baseMinutes: 2,

  slides: [
    // ---------------------------------------------------------- 1. 封面
    {
      id: "cover",
      type: "cover",
      navLabel: "封面",
      eyebrow: "自我介紹",
      nameSecondary: "蕭祖佑",
      name: "Luke Hsiao",
      role: "Senior Backend Engineer",
      tagline: "5 年以上 Python / AWS 後端經驗，專注在把混亂的真實文件與大量資料，變成穩定、可自動化的系統。",
      stack: ["Python", "FastAPI / Chalice", "AWS Lambda · S3 · EventBridge", "MySQL", "Docker"],
      contact: ["chuyu.hsiao.tw@gmail.com", "Taipei, Taiwan"],
      hint: "方向鍵或空白鍵切換頁面，F 全螢幕",
      facts: [
        { k: "目前", v: "Pacston 沛思坦網路 · 移民文件平台後端負責人" },
        { k: "經歷", v: "5+ 年後端開發（Pacston、MaideaX）" },
        { k: "今天想分享", v: "{count} 個專案，5–10 分鐘內講完" },
      ],
    },

    // ---------------------------------------------------------- 2. 關於我
    {
      id: "about",
      type: "about",
      navLabel: "關於我",
      eyebrow: "關於我",
      title: "5+ 年經驗的軟體工程師",
      summary:
        "主要用 Python 開發 Web 後端服務，熟悉 FastAPI、Chalice 與 AWS Serverless。擅長非同步資料處理、資料庫設計與效能調校，也習慣直接和 PM、使用者、客戶端律師溝通需求。",
      highlights: [
        { icon: "01", title: "文件自動化", text: "PDF 抽取、分類、驗證、自動填表的完整 pipeline，搭配 Human-in-the-loop 把關。" },
        { icon: "02", title: "大量資料與非同步處理", text: "Lambda、EventBridge、狀態機與冪等設計，處理過億級資料與批次同步。" },
        { icon: "03", title: "資料庫設計與調校", text: "從 schema、索引到分區設計，實際用 profiling 找瓶頸、解 N+1。" },
        { icon: "04", title: "溝通與帶人", text: "帶新人 12 週內獨立開發功能；用具體選項取代開放式問題，降低來回成本。" },
      ],
      timelineTitle: "經歷",
      timeline: [
        { when: "2023.06 – 現在", title: "Pacston 沛思坦網路 · Senior Software Engineer", text: "移民文件打包平台、學術文件平台後端" },
        { when: "2020.03 – 2022.03", title: "MaideaX 麥睿資訊 · Software Engineer", text: "第三方支付網站、Docker 無停機部署、自動化" },
        { when: "2019.02 – 2019.07", title: "大聯大投資控股 · Intern", text: "Spring Boot API、自動化測試" },
        { when: "2015 – 2019", title: "雲林科技大學 資訊管理系", text: "GPA 3.77 / 4.0 · TOEIC 930" },
      ],
      skillsTitle: "技術",
      skills: ["Python", "FastAPI", "Chalice", "AWS Lambda", "EventBridge", "S3", "CloudWatch", "MySQL", "Docker", "Pydantic", "OpenAI API", "Git"],
    },

    // ---------------------------------------------------------- 3. 專案 A
    {
      id: "project-a",
      type: "project",
      minutes: 3,
      navLabel: "專案 A · 移民文件平台",
      eyebrow: "近期主責專案",
      period: "2025.03 – 現在",
      role: "唯一後端負責人（PM 1、前端 1、後端 1、AI team 後期加入）",
      title: "移民文件線上打包平台",
      tagline: "把律師與客戶上傳的各種文件，自動轉檔、辨識版本、分類、驗證並填表，讓 Package Team 只需要做最後確認。",
      tech: ["Python", "FastAPI", "AWS Lambda", "EventBridge Scheduler", "S3", "MySQL", "PyMuPDF", "OpenAI API", "Pydantic"],
      problem: [
        "Package Team 每天人工審閱數百份 PDF：判斷文件類型、核對 **USCIS 表單版本日期**、手動分類與 key-in 欄位。",
        "視覺疲勞容易漏看舊版表單或放錯區塊，整包會被移民局退件，客訴不斷。",
        "文件來源多（客戶上傳、內部 CMS、zip、Word、圖片、掃描檔），格式混亂。",
      ],
      solution: [
        { label: "統一格式：", text: "遞迴解壓 zip，Word / 圖片一律轉成 PDF。" },
        { label: "混合式抽取：", text: "數位 PDF 用 PyMuPDF 讀取版本日期與欄位；掃描檔才 fallback 到 OpenAI OCR，結果一律經過 Pydantic 驗證。" },
        { label: "分類與比對：", text: "串接 AI 分類 API 自動歸入文件區塊，與 CMS 問卷交叉比對，不一致就標記、空欄位自動填入。" },
        { label: "非同步同步系統：", text: "Lambda + EventBridge 排程，用狀態機（Pending / Processing / Done / Error）追蹤每份文件，自動重試並保證冪等。" },
        { label: "Human-in-the-loop：", text: "低信心結果標記給人工確認，最終由團隊與律師把關後才打包送件。" },
      ],
      stat: { num: "-64%", label: "文件錯誤與相關客訴" },
      result: [
        "單批 **200+ 份文件** 穩定非同步處理，AI 分類 15–20 分鐘的延遲透過「先偷跑」設計對使用者近乎無感。",
        "另建 USCIS 表單更新監控，自動解析並 email 通知合作律師。",
        "帶領新進工程師，12 週內能獨立開發功能。",
      ],
      flow: [
        { label: "上傳 / CMS", sub: "zip · Word · 圖片 · PDF" },
        { label: "轉檔", sub: "統一成 PDF" },
        { label: "抽取", sub: "PyMuPDF → OCR fallback", hl: true },
        { label: "驗證", sub: "Pydantic · 版本日期" },
        { label: "分類 / 比對", sub: "AI API · CMS 問卷", hl: true },
        { label: "人工確認", sub: "Approve" },
        { label: "打包送件" },
      ],
    },

    // ---------------------------------------------------------- 4. 專案 B
    {
      id: "project-b",
      type: "project",
      minutes: 2,
      navLabel: "專案 B · 2.4 億筆資料",
      eyebrow: "亮點專案",
      period: "2023 – 2024",
      role: "學術文件平台 · 後端",
      title: "2.4 億筆學術資料匯入與解析",
      tagline: "在期限與預算的壓力下，把 MAKG 2.4 億筆 RDF 資料匯入內部資料庫，靠 profiling 與 Regex 把解析時間砍掉 94%。",
      tech: ["Python", "AWS Lambda", "EC2", "MySQL", "Regex", "Pydantic", "Profiling"],
      problem: [
        "第一次處理億級資料，初版方案用 Lambda 併發打 API 取資料，**benchmark 後發現 AWS 成本過高**。",
        "改在 EC2 讀原始檔逐行解析，但 rdflib 解析整個 RDF 結構太慢，眼看要錯過上線期限。",
        "Regex 快但有風險：跨行資料等 edge case 會讓解析出錯。",
      ],
      solution: [
        { label: "先量測再決定：", text: "每個方案都先跑 benchmark，主動向主管與 DevOps 更新結果，決定從 Lambda 改成 EC2 以控制成本。" },
        { label: "Profiling 找瓶頸：", text: "發現時間都花在 rdflib 解析用不到的欄位。只取需要的幾個欄位，改用 Regex pattern matching。" },
        { label: "驗證層當安全網：", text: "每筆結果經 Pydantic 驗證，失敗的行記錄下來可事後重跑，中途當機也不會遺失資料。" },
        { label: "資料庫分區：", text: "依年份做 partition，貼合學術資料「新資料查得多」的存取模式。" },
      ],
      stat: { num: "94%", label: "單檔解析時間縮短（72s → 5s）" },
      result: [
        "全部資料 **準時、在預算內** 完成匯入。",
        "延伸建立 OpenAlex 每日自動同步 pipeline（S3 polling、log、通知），取代每季手動更新。",
        "學到：先優化程式，再考慮買更多硬體；壓力下務實比華麗架構重要。",
      ],
      flow: [
        { label: "Lambda + API", sub: "成本太高 ✗" },
        { label: "EC2 + rdflib", sub: "72 秒 / 檔 ✗" },
        { label: "split / replace", sub: "12 秒 / 檔" },
        { label: "Regex", sub: "5 秒 / 檔 ✓", hl: true },
        { label: "Pydantic 驗證", sub: "失敗可重跑" },
        { label: "MySQL", sub: "依年份分區" },
      ],
    },

    // ---------------------------------------------------------- 5. 專案 C
    {
      id: "project-c",
      type: "project",
      minutes: 1.5,
      navLabel: "專案 C · 內部聊天系統",
      eyebrow: "亮點專案",
      period: "2023 – 2024",
      role: "資料庫設計與 API 開發",
      title: "內部即時聊天系統",
      tagline: "類似 Google Chat 的內部通訊工具，從 schema 設計到 API 實作，服務 100+ 位使用者。",
      tech: ["Python", "MySQL", "Partition / Index", "WebSocket", "REST API"],
      problem: [
        "需要支援空間（space）、群組、討論串（thread）、訊息、檔案與已讀狀態，關聯複雜。",
        "訊息表會持續長大，查詢要一直維持在可接受的延遲。",
        "早期 API 有 N+1 查詢，聊天室一多就明顯變慢。",
      ],
      solution: [
        { label: "Schema 設計：", text: "space / member / thread / message / files 五張核心表；thread 就是沒有 parent 的 space，減少特殊邏輯。" },
        { label: "分區策略：", text: "message 依 `HASH(space_id)` 切 100 個分區並用複合主鍵 (id, space_id)，同一聊天室的訊息落在同一分區；files 依類型做 LIST partition。" },
        { label: "效能調校：", text: "用 map + `IN (ids)` 解 N+1；觀察使用習慣後先過濾掉 thread 再查訊息，降低掃描量。" },
        { label: "即時傳遞：", text: "以 WebSocket 推送新訊息與已讀狀態。" },
      ],
      stat: { num: "100+", label: "內部使用者穩定使用" },
      result: [
        "從資料庫架構到 API 一手完成，成為公司內部日常溝通工具。",
        "分區與索引設計讓訊息量成長後查詢仍維持穩定。",
        "延伸經驗：存取 log 透過 middleware 搬到 CloudWatch，並用 GoAccess 視覺化 Nginx log 做流量告警。",
      ],
      flow: [
        { label: "Client", sub: "Web" },
        { label: "REST API", sub: "Python" },
        { label: "WebSocket", sub: "即時推送", hl: true },
        { label: "MySQL", sub: "message HASH(space_id) × 100", hl: true },
        { label: "files", sub: "LIST partition by type" },
      ],
    },


    // ---------------------------------------------------------- 專案 D（選用）
    {
      id: "project-d",
      type: "project",
      minutes: 1.5,
      navLabel: "專案 D · 無停機部署",
      eyebrow: "亮點專案",
      period: "2020 – 2022",
      role: "MaideaX · 後端 / 部署",
      title: "Docker 無停機部署與自動化維運",
      tagline: "把第三方支付網站的部署從「手動、要停機」變成一鍵更新、零停機，並讓 SSL 憑證自動續期。",
      pickerNote: "Docker、CI/CD 精神、維運經驗；適合重視 DevOps 的公司",
      tech: ["Docker", "docker-compose", "Nginx", "certbot", "Shell", "EC2"],
      problem: [
        "支付網站每次更新都要停機，手動部署步驟多、容易出錯。",
        "SSL 憑證到期靠人記，曾有忘記更新的風險。",
        "沒有 CI 工具，部署流程沒辦法事先驗證。",
      ],
      solution: [
        { label: "容器化：", text: "用 docker-compose 把服務、Nginx、環境設定封裝，版本與環境一致。" },
        { label: "一鍵更新：", text: "寫一個指令在部署機上執行 pipeline：拉新 image → 啟新容器 → 健康檢查通過才切流量 → 移除舊容器。" },
        { label: "憑證自動續期：", text: "certbot 排程自動更新並 reload Nginx。" },
        { label: "先模擬再上線：", text: "用 Docker 起 Linux 模擬整個部署流程測試，確保指令在正式機不會出錯。" },
      ],
      stat: { num: "0", label: "秒停機的更新" },
      result: [
        "正式環境更新不再中斷服務，部署從多步驟手動變成一個指令。",
        "另建內部沙箱環境給合作方測試串接。",
        "沒有 CI 工具也把 CI/CD 的精神做出來：可重複、可驗證、可回滾。",
      ],
      flow: [
        { label: "git push" },
        { label: "build image" },
        { label: "部署機 pull", sub: "一鍵指令", hl: true },
        { label: "起新容器", sub: "health check" },
        { label: "切流量", sub: "Nginx", hl: true },
        { label: "移除舊容器" },
      ],
    },

    // ---------------------------------------------------------- 專案 E（選用）
    {
      id: "project-e",
      type: "project",
      minutes: 1.5,
      navLabel: "專案 E · AI 客服分類",
      eyebrow: "亮點專案",
      period: "2024",
      role: "學術文件平台 · 後端",
      title: "AI 客服問題分類器",
      tagline: "用 OpenAI API 把客戶問題自動分類並摘要重點，讓客服交接不用重看整段對話。",
      pickerNote: "LLM 應用、prompt 設計、成本取捨；適合 AI 相關職缺",
      tech: ["Python", "OpenAI API", "Prompt Design", "JSON Output", "Chrome Extension"],
      problem: [
        "客服會換人接手，後面的人難以 follow 前面的問題，回覆時間拉長。",
        "問題類型多，人工判斷該轉給哪個團隊容易錯。",
      ],
      solution: [
        { label: "抓取對話：", text: "做一個 Chrome extension 從客服系統取得對話內容。" },
        { label: "Prompt 設計：", text: "要求模型以固定 JSON 格式輸出：類別、重點句、建議路由，方便程式解析。" },
        { label: "驗證與路由：", text: "解析結果做 schema 驗證，再依類別轉給對應的支援團隊。" },
        { label: "成本控管：", text: "評估後只開放給新進客服使用，把 token 花在最有價值的地方。" },
      ],
      stat: { num: "83%", label: "路由準確率" },
      result: [
        "客服處理時間 **減少 57%**，新人也能快速接手。",
        "學到 LLM 落地的重點：結構化輸出、驗證層、以及誠實面對 API 成本。",
      ],
      flow: [
        { label: "客服對話" },
        { label: "Chrome extension" },
        { label: "OpenAI API", sub: "JSON prompt", hl: true },
        { label: "驗證", sub: "schema" },
        { label: "路由到團隊", hl: true },
      ],
    },

    // ---------------------------------------------------------- 專案 F（選用）
    {
      id: "project-f",
      type: "project",
      minutes: 1.5,
      navLabel: "專案 F · 資料自動同步",
      eyebrow: "亮點專案",
      period: "2024",
      role: "學術文件平台 · 後端",
      title: "OpenAlex 學術資料自動同步",
      tagline: "把每季一次的人工資料更新，變成每天自動檢查、下載、解析、通知的 pipeline。",
      pickerNote: "排程、自動化、資料 pipeline；適合資料量大的產品",
      tech: ["Python", "AWS Lambda", "EventBridge", "S3", "MySQL"],
      problem: [
        "OpenAlex 資料每季要人工重新同步，耗時且容易漏掉更新。",
        "資料量大，單次處理容易 timeout，出錯也沒人知道。",
      ],
      solution: [
        { label: "依官方文件設計：", text: "照 OpenAlex 的 manifest 格式，每天由 EventBridge 排程觸發，比對哪些檔案有更新。" },
        { label: "分段處理：", text: "以檔案為單位下載、解析、寫入資料庫，失敗的檔案記錄後重試。" },
        { label: "可觀測：", text: "每次同步輸出 log 與摘要通知，異常立即知道。" },
      ],
      stat: { num: "-89%", label: "人工同步作業" },
      result: [
        "資料從「一季一次」變成「每天最新」，不再需要人盯。",
        "與 2.4 億筆匯入的經驗互補：先大量灌入，再用排程持續增量同步。",
      ],
      flow: [
        { label: "EventBridge", sub: "每日排程" },
        { label: "manifest 比對", sub: "S3 polling", hl: true },
        { label: "下載 / 解析" },
        { label: "MySQL" },
        { label: "log + 通知", hl: true },
      ],
    },

    // ---------------------------------------------------------- 專案 G（選用）
    {
      id: "project-g",
      type: "project",
      minutes: 1.5,
      navLabel: "專案 G · 抄襲比對",
      eyebrow: "亮點專案",
      period: "2024",
      role: "學術文件平台 · 後端",
      title: "文件抄襲比對演算法",
      tagline: "為了防止外包寫手抄襲，設計能容忍小幅改寫、並精確標出抄襲區段的比對邏輯。",
      pickerNote: "演算法與資料結構的實戰；適合會考 algorithm 的公司",
      tech: ["Python", "Sliding Window", "Interval Merge", "Counter"],
      problem: [
        "客戶要求偵測合約寫手是否抄襲既有文件，但抄襲通常會小幅改字，完全比對抓不到。",
        "要在原文上標出抄襲區段，可是斷詞後的 word list 與原文位置有偏移。",
        "一開始用 minimum steps（編輯距離）思路，效能與結果都不符需求。",
      ],
      solution: [
        { label: "Sliding window + Counter：", text: "以固定視窗比較詞頻，允許一定比例的差異，抓到「改了幾個字」的抄襲。" },
        { label: "Interval 合併：", text: "把命中的視窗轉成區間並合併重疊，輸出乾淨的標註範圍。" },
        { label: "偏移校正：", text: "用 list 記錄特殊字元數量，把 word index 對回原文的字元位置。" },
      ],
      result: [
        "比對結果符合客戶要求，提升對寫手產出的信任。",
        "學到：先把需求翻成正確的資料結構，比套用「標準答案」演算法更重要。",
      ],
      flow: [
        { label: "原文 / 待比對文" },
        { label: "斷詞", sub: "記錄偏移" },
        { label: "Sliding window", sub: "Counter 容忍差異", hl: true },
        { label: "Interval merge", hl: true },
        { label: "標註輸出" },
      ],
    },

    // ---------------------------------------------------------- 專案 H（選用）
    {
      id: "project-h",
      type: "project",
      minutes: 1.5,
      navLabel: "專案 H · 監控與日誌",
      eyebrow: "亮點專案",
      period: "2024 – 2025",
      role: "Pacston · 後端",
      title: "監控、日誌與告警系統",
      tagline: "把 log 從資料庫與機器裡搬出來，做到不用 ssh 就能看、出問題會主動通知。",
      pickerNote: "可觀測性、維運意識；適合重視 reliability 的團隊",
      tech: ["FastAPI Middleware", "AWS CloudWatch", "GoAccess", "Nginx", "EventBridge", "Telegram Bot"],
      problem: [
        "access log 存在 MySQL，拖慢主要資料庫；要看 log 得連進機器。",
        "異常流量或錯誤沒有人第一時間知道，都是客戶先回報。",
      ],
      solution: [
        { label: "集中日誌：", text: "用 FastAPI middleware 把每個 request 的 context 送到 CloudWatch，資料庫不再存 log。" },
        { label: "視覺化：", text: "GoAccess 定期把 Nginx log 產成報表，流量趨勢一眼看懂。" },
        { label: "告警：", text: "EventBridge 每小時統計 request 數量，異常就告警；程式錯誤由 Telegram bot 即時推送 stack trace。" },
        { label: "找回卡住的任務：", text: "排程掃描停在 Processing 太久的紀錄，自動重置讓 worker 重跑。" },
      ],
      stat: { num: "-77%", label: "人工查 log 時間" },
      result: [
        "問題在客戶回報前就先被發現，部署出錯能立刻 rollback。",
        "正在推動 correlation ID，讓一份文件的完整生命週期可以用一個 ID 查完。",
      ],
      flow: [
        { label: "Request" },
        { label: "Middleware", sub: "FastAPI", hl: true },
        { label: "CloudWatch", sub: "集中 log" },
        { label: "GoAccess", sub: "Nginx 報表" },
        { label: "EventBridge", sub: "每小時統計" },
        { label: "Telegram 告警", hl: true },
      ],
    },

    // ---------------------------------------------------------- 6. 結尾
    {
      id: "closing",
      type: "closing",
      navLabel: "結尾",
      eyebrow: "總結",
      title: "謝謝，歡迎提問。",
      contact: ["chuyu.hsiao.tw@gmail.com", "Luke Hsiao · 蕭祖佑"],
    },
  ],
};
