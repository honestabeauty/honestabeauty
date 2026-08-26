# Journal 定時自動發布

本功能讓後台文章可儲存為「預定發布」，並在指定的香港時間到達後自動轉為「已發布」。系統使用 Supabase 儲存文章與發布紀錄，並由 Vercel Cron 每 15 分鐘執行一次受保護的發布端點。

## 一次性部署設定

請先在 Supabase SQL Editor 執行 `supabase/migrations/004_kz_cms_journal_scheduling.sql`。這會加入 `scheduled` 狀態、`scheduled_at` 欄位，以及 `kz_cms_publish_runs` 的執行紀錄表。

然後在 Vercel 專案的 Environment Variables 設定下列兩項伺服器端環境變數，並套用至 Production 與 Preview：

| 變數 | 用途 | 注意事項 |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | 讓受保護的發布端點更新到期文章 | 必須保密，絕不可使用 `NEXT_PUBLIC_` 前綴 |
| `CRON_SECRET` | 驗證 Vercel 對 `/api/cron/publish-journal` 的排程請求 | 使用至少 16 個字元的隨機值 |

完成環境變數設定與資料庫遷移後，部署包含 `vercel.json` 的版本。Vercel 會依 `*/15 * * * *` 呼叫發布端點，因此文章會在指定時間後的下一個 15 分鐘檢查週期公開。

## 後台使用方式

請進入 `/admin/journal` 後新增或編輯文章。在「狀態」選取「預定發布」，再於「預定發布時間（香港時間）」輸入將要上線的日期與時間，最後儲存。系統會將這篇文章維持為非公開，直到定時工作發現其時間已到。

若改選「草稿」或「已發布」，系統會清除預定時間。「已發布」會如既有流程般立即公開。

## SEO 與 Google 爬取

預定中的文章維持 `scheduled` 狀態，不會出現在公開 Journal、文章網址或 sitemap。時間到達後，排程端點會將文章改為 `published`，並重新驗證首頁、Journal 列表、該文章網址與 `/sitemap.xml`；因此 Google 可經由內部連結及 sitemap 發現新文章。文章頁會輸出 canonical URL、`BlogPosting` JSON-LD、麵包屑結構化資料與 Open Graph metadata；`robots.txt` 允許公開內容並排除 `/admin/` 和 `/api/`。

發布後，請在 Google Search Console 確認 `https://honestabeauty.com/sitemap.xml` 已提交，並使用網址檢查工具驗證新文章網址可供 Google 抓取。索引與重新抓取需要時間，無法保證即時或保證排名。

## 驗證與除錯

每次定時工作會在 `kz_cms_publish_runs` 寫入執行紀錄，包括開始／完成時間、已公開文章數量、文章 slug，以及失敗訊息。Vercel 的 Cron Jobs 與 Runtime Logs 亦可用於檢查是否成功觸發。

發布端點只接受帶有正確 `Authorization: Bearer <CRON_SECRET>` 標頭的請求。請勿把端點網址、`CRON_SECRET` 或 service-role key 寫入前端程式碼或公開文件。

## 平台限制

Vercel Cron 的時間表採 UTC；本專案採每 15 分鐘檢查，所以不受時區轉換影響。Vercel Hobby 方案的 Cron 最多每日一次，且可能在指定小時內的任一時間觸發；若專案使用此方案，請將 `vercel.json` 的排程調整為每天一次並接受較寬鬆的準點程度。詳情請參閱 Vercel 官方 Cron Jobs 文件。

- https://vercel.com/docs/cron-jobs
- https://vercel.com/docs/cron-jobs/manage-cron-jobs
