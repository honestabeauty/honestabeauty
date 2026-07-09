import Link from "next/link";

export default function AdminGuidePage() {
  return (
    <>
      <div className="kz-admin__header">
        <div className="kz-admin__header-main">
          <h1 className="kz-admin__title">CMS 使用說明</h1>
          <p className="kz-admin__subtitle">
            康姿健官網內容管理完整手冊。各編輯頁頂部亦有「使用說明」連結可快速跳至對應章節。
          </p>
        </div>
      </div>

      <div className="kz-admin__guide">
        <section className="kz-admin__card kz-admin__guide-section" id="quick-start">
          <h2 className="kz-admin__guide-h2">常用 5 件事</h2>
          <p>多數日常更新只需要以下入口：</p>
          <ul className="kz-admin__guide-quick">
            <li>
              <Link href="/admin/site">
                改電話／地址
                <span>站點設定</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/hero">
                改首頁主圖
                <span>首頁主視覺</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/content#wellness">
                改痛症頁服務圖文
                <span>共用文案區塊</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/journal">
                發／改文章
                <span>醫美知識</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/media">
                上傳圖片
                <span>媒體庫</span>
              </Link>
            </li>
          </ul>
          <p className="kz-admin__guide-note">
            不知道改哪一頁？先去{" "}
            <Link href="/admin#page-hubs">儀表板 · 依頁面編輯</Link>。
          </p>
        </section>

        <nav className="kz-admin__guide-toc kz-admin__card" aria-label="目錄">
          <h2 className="kz-admin__guide-h2">目錄</h2>
          <ol>
            <li><a href="#quick-start">常用 5 件事</a></li>
            <li><a href="#overview">系統概述</a></li>
            <li><a href="#cms-basics">CMS 共通概念</a></li>
            <li><a href="#login">登入與權限</a></li>
            <li><a href="#workflow">列表內容操作流程</a></li>
            <li><a href="#hero">首頁主視覺</a></li>
            <li><a href="#home-sections">首頁區塊</a></li>
            <li><a href="#site-content">共用文案區塊</a></li>
            <li><a href="#inner-pages">各頁標題與 SEO</a></li>
            <li><a href="#media-spec">圖片與媒體規格</a></li>
            <li><a href="#video-spec">影片規格</a></li>
            <li><a href="#journal">醫美知識</a></li>
            <li><a href="#treatments">療程</a></li>
            <li><a href="#videos">店內短片</a></li>
            <li><a href="#media-lib">媒體庫</a></li>
            <li><a href="#faq">常見問題（FAQ）</a></li>
            <li><a href="#site">站點設定</a></li>
            <li><a href="#backup">備份</a></li>
            <li><a href="#limits">容量與技術上限</a></li>
            <li><a href="#frontend">前台生效範圍</a></li>
            <li><a href="#troubleshooting">疑難排解</a></li>
          </ol>
        </nav>

        <section id="overview" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">1. 系統概述</h2>
          <p>
            康姿健 CMS 用於管理官網文案、首頁版面、內頁頁首、療程與文章等內容。
            資料儲存於 Supabase（表名前綴 <code>kz_cms_</code>），與其他專案共用資料庫但彼此隔離。
          </p>
          <table className="kz-admin__table">
            <thead>
              <tr>
                <th>模組</th>
                <th>路徑</th>
                <th>可做什麼</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>儀表板</td><td><Link href="/admin">/admin</Link></td><td>內容數量、最近更新、GA4 事件目錄</td></tr>
              <tr><td>首頁主視覺</td><td><Link href="/admin/hero">/admin/hero</Link></td><td>輪播主圖、標題、tagline、CTA、marquee 認證</td></tr>
              <tr><td>首頁區塊</td><td><Link href="/admin/home-sections">/admin/home-sections</Link></td><td>區塊排序、顯示開關、Teaser 文案與圖片</td></tr>
              <tr><td>共用文案區塊</td><td><Link href="/admin/content">/admin/content</Link></td><td>信任花瓣、量膚流程、品牌敘事、客人評價、痛症服務、聯絡標題</td></tr>
              <tr><td>各頁標題與 SEO</td><td><Link href="/admin/pages">/admin/pages</Link></td><td>各內頁頁首、說明面板、SEO meta、leadHighlight</td></tr>
              <tr><td>醫美知識</td><td><Link href="/admin/journal">/admin/journal</Link></td><td>新增、編輯、刪除文章</td></tr>
              <tr><td>療程</td><td><Link href="/admin/treatments">/admin/treatments</Link></td><td>新增、編輯、刪除療程與圖片</td></tr>
              <tr><td>店內短片</td><td><Link href="/admin/videos">/admin/videos</Link></td><td>管理短片標題、封面、排序</td></tr>
              <tr><td>媒體庫</td><td><Link href="/admin/media">/admin/media</Link></td><td>集中上傳／刪除圖片、資料夾篩選</td></tr>
              <tr><td>常見問題</td><td><Link href="/admin/faq">/admin/faq</Link></td><td>新增、編輯、刪除 FAQ</td></tr>
              <tr><td>站點設定</td><td><Link href="/admin/site">/admin/site</Link></td><td>電話、營業時間、地址、社群連結、首頁 SEO</td></tr>
            </tbody>
          </table>
          <p className="kz-admin__guide-note">
            側邊欄已分為「版面與文案」「列表內容」「資源」三類，方便區分固定文案模組與可新增刪除的列表資料。
          </p>
        </section>

        <section id="cms-basics" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">2. CMS 共通概念</h2>
          <p>以下規則適用於主視覺、首頁區塊、共用文案區塊、各頁標題與 SEO 等「設定型」模組：</p>

          <h3 className="kz-admin__guide-h3">2.1 留空＝使用預設</h3>
          <p>
            欄位留空時，前台會顯示 <code>src/data/</code> 內建的靜態預設值。
            只有實際填寫並儲存的內容才會覆寫預設。
          </p>

          <h3 className="kz-admin__guide-h3">2.2 「已自訂 / 使用預設」標籤</h3>
          <p>
            標題旁的 badge 表示該模組是否已有 CMS 覆寫資料。
            「已自訂」代表至少有一個欄位曾被儲存過；「使用預設」代表完全沿用程式預設。
          </p>

          <h3 className="kz-admin__guide-h3">2.3 還原預設</h3>
          <p>
            各模組可按「還原預設」清除該模組的自訂內容，恢復為靜態預設值。
            共用文案區塊各區塊有獨立的還原按鈕；主視覺、首頁區塊、內頁則在頁面頂部。
          </p>

          <h3 className="kz-admin__guide-h3">2.4 儲存後預覽</h3>
          <ol className="kz-admin__guide-steps">
            <li>按「儲存」後，頁面頂部會出現綠色提示列。</li>
            <li>點「預覽前台 ↗」可在新分頁查看對應頁面（URL 帶 <code>?saved=1&amp;preview=...</code>）。</li>
            <li>前台約 <strong>1 分鐘</strong>內反映變更（快取 revalidate 60 秒）；若未看到，請重新整理或稍候。</li>
            <li>可點「關閉」隱藏提示列（不影響已儲存的內容）。</li>
          </ol>

          <h3 className="kz-admin__guide-h3">2.5 欄位對照圖</h3>
          <p>
            「共用文案區塊」與「各頁標題與 SEO」各模組下方附有<strong>欄位對照圖</strong>，
            標示每個欄位在前台的顯示位置。編輯時可搭配「在前台查看此區塊 ↗」連結確認。
          </p>
        </section>

        <section id="login" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">3. 登入與權限</h2>
          <ol className="kz-admin__guide-steps">
            <li>前往 <Link href="/admin/login">/admin/login</Link>，使用 Supabase 註冊的電郵登入。</li>
            <li>帳號必須已加入 <code>kz_cms_admins</code> 表，否則會顯示「無權限」。</li>
            <li>角色：<code>owner</code>（擁有者）、<code>editor</code>（編輯者）。</li>
          </ol>
        </section>

        <section id="workflow" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">4. 列表內容操作流程</h2>
          <p>適用於醫美知識、療程、短片、FAQ 等可新增／刪除的列表模組。</p>
          <h3 className="kz-admin__guide-h3">4.1 發布內容</h3>
          <ol className="kz-admin__guide-steps">
            <li>側邊欄進入對應模組 → 點「新增」或列表中的「編輯」。</li>
            <li>填寫欄位 → 狀態選「已發布」→ 按「儲存」。</li>
            <li>若要暫不上線，狀態選「草稿」（前台不會顯示）。</li>
          </ol>
          <h3 className="kz-admin__guide-h3">4.2 圖片</h3>
          <ol className="kz-admin__guide-steps">
            <li>在圖片欄位按 <strong>「上傳圖片」</strong>，選擇檔案後自動上傳並填入 URL。</li>
            <li>或按 <strong>「從媒體庫選擇」</strong>，在彈窗點選已有圖片。</li>
            <li>亦可手動貼上 <code>/images/...</code> 或 Supabase 公開 URL。</li>
            <li>填寫 <strong>alt 文字</strong>（無障礙與 SEO）。</li>
          </ol>
          <h3 className="kz-admin__guide-h3">4.3 刪除</h3>
          <p>編輯頁底部按「刪除」→ 確認後永久刪除，無法復原。</p>
        </section>

        <section id="hero" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">5. 首頁主視覺</h2>
          <p>
            <strong>路徑：</strong> <Link href="/admin/hero">/admin/hero</Link> ·
            前台 <Link href="/">首頁</Link> 最上方輪播區
          </p>
          <table className="kz-admin__table">
            <thead>
              <tr><th>區塊</th><th>說明</th></tr>
            </thead>
            <tbody>
              <tr><td>輪播 slides</td><td>最多 5 張主圖，每張含 src、alt</td></tr>
              <tr><td>標題 title / 英文 tagline</td><td>主視覺主標與副標</td></tr>
              <tr><td>賣點 bullets</td><td>三行重點列表</td></tr>
              <tr><td>CTA</td><td>主按鈕文字與連結、次要連結</td></tr>
              <tr><td>Marquee 導覽</td><td>底部快速連結列（標籤 + 路徑）</td></tr>
              <tr><td>Marquee 認證</td><td>認證徽章文字與 highlight 樣式</td></tr>
            </tbody>
          </table>
          <p className="kz-admin__guide-note">
            留空欄位使用靜態預設。頁面頂部「還原預設」可一次清除所有主視覺覆寫。
          </p>
        </section>

        <section id="home-sections" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">6. 首頁區塊</h2>
          <p>
            <strong>路徑：</strong> <Link href="/admin/home-sections">/admin/home-sections</Link> ·
            前台 <Link href="/">首頁</Link> 各內容區塊
          </p>
          <ul>
            <li><strong>拖曳排序：</strong>左側 ⠿ 拖曳調整區塊順序，儲存表單時寫入。</li>
            <li><strong>顯示開關：</strong>取消勾選可隱藏整個區塊（如店內短片、療程輪播等）。</li>
            <li><strong>Teaser 文案：</strong>點區塊列展開，可編輯標題、描述、連結、圖片等（依區塊類型而定）。</li>
            <li><strong>收合狀態：</strong>收合區塊不會清除已填欄位，儲存時仍會一併寫入。</li>
          </ul>
          <p className="kz-admin__guide-note">
            部分區塊（如精選療程、醫美文章）的資料來自列表模組，此處僅控制是否顯示與 Teaser 文案。
          </p>
        </section>

        <section id="site-content" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">7. 共用文案區塊</h2>
          <p>
            <strong>路徑：</strong> <Link href="/admin/content">/admin/content</Link> ·
            各模組附欄位對照圖
          </p>

          <h3 className="kz-admin__guide-h3">7.1 信任花瓣</h3>
          <p>首頁「為什麼選康姿健」— 四張數據卡（左上／右上／左下／右下）、兩段引言、重點列表。</p>

          <h3 className="kz-admin__guide-h3">7.2 量膚流程</h3>
          <p>首頁四步驟流程區塊 — 區塊標題與每步編號、標題、說明。</p>

          <h3 className="kz-admin__guide-h3">7.3 品牌敘事</h3>
          <p>首頁品牌故事章節 — 每章標題、內文、圖片（建議 4:5 直式）。</p>

          <h3 className="kz-admin__guide-h3">7.4 客人評價</h3>
          <p>
            首頁評價輪播 — 可拖曳排序、個別隱藏、編輯引文／作者／meta。
            未勾選「顯示」的評價不會出現在前台。
          </p>

          <h3 className="kz-admin__guide-h3">7.5 痛症護理（共用文案區塊 vs 各頁標題與 SEO）</h3>
          <table className="kz-admin__table">
            <thead>
              <tr><th>內容</th><th>編輯位置</th><th>前台位置</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>三項圖文服務（Dr. Rainbow、養生排毒、Dr. Face）</td>
                <td><Link href="/admin/content">共用文案區塊 · 痛症護理</Link></td>
                <td><code>/wellness</code> 服務列表區</td>
              </tr>
              <tr>
                <td>傳統護理列表（標題、項目、備註）</td>
                <td><Link href="/admin/content">共用文案區塊 · 痛症護理</Link></td>
                <td><code>/wellness</code> 傳統護理區</td>
              </tr>
              <tr>
                <td>頁首標題、說明、按鈕</td>
                <td><Link href="/admin/pages?page=wellness">各頁標題與 SEO · 痛症理療</Link></td>
                <td><code>/wellness</code> 頁首</td>
              </tr>
              <tr>
                <td>灰底說明面板</td>
                <td><Link href="/admin/pages?page=wellness">各頁標題與 SEO · 痛症理療</Link></td>
                <td><code>/wellness</code> 下方面板</td>
              </tr>
            </tbody>
          </table>

          <h3 className="kz-admin__guide-h3">7.6 聯絡標題</h3>
          <p>關於／聯絡頁的區塊標題（<code>/about</code> 聯絡區）。</p>

          <p className="kz-admin__guide-note">
            各模組可獨立「還原預設」，不影響其他模組的自訂內容。
          </p>
        </section>

        <section id="inner-pages" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">8. 各頁標題與 SEO</h2>
          <p>
            <strong>路徑：</strong> <Link href="/admin/pages">/admin/pages</Link>
          </p>
          <p>先從下拉選單選擇內頁，下方表單會立即切換為該頁欄位。</p>
          <table className="kz-admin__table">
            <thead>
              <tr><th>內頁</th><th>路徑</th><th>可編輯</th></tr>
            </thead>
            <tbody>
              <tr><td>量膚定制</td><td><code>/skin-analysis</code></td><td>頁首、面板、SEO</td></tr>
              <tr><td>痛症理療</td><td><code>/wellness</code></td><td>頁首、面板、SEO（服務列表見共用文案區塊）</td></tr>
              <tr><td>關於我們</td><td><code>/about</code></td><td>頁首、面板、SEO</td></tr>
              <tr><td>醫美知識</td><td><code>/journal</code></td><td>頁首、SEO（文章列表來自醫美知識模組）</td></tr>
              <tr><td>療程總覽</td><td><code>/treatments</code></td><td>頁首、SEO</td></tr>
              <tr><td>常見問題</td><td><code>/faq</code></td><td>頁首、SEO</td></tr>
            </tbody>
          </table>

          <h3 className="kz-admin__guide-h3">8.1 頁首欄位</h3>
          <ul>
            <li><strong>title / lead / leadHighlight：</strong>主標、副文、副文高亮片段（會以品牌色強調）。</li>
            <li><strong>ctaLabel / ctaHref：</strong>主按鈕（部分頁面為 WhatsApp 欄位）。</li>
            <li><strong>image / imageAlt：</strong>頁首背景或主圖。</li>
          </ul>

          <h3 className="kz-admin__guide-h3">8.2 說明面板</h3>
          <ul>
            <li>可拖曳排序、取消勾選隱藏、新增自訂面板。</li>
            <li>每面板含標題、內文、列表（每行一項）。</li>
          </ul>

          <h3 className="kz-admin__guide-h3">8.3 SEO meta</h3>
          <p>
            <code>metaTitle</code>、<code>metaDescription</code> 覆寫該內頁的瀏覽器標題與搜尋描述。
            留空則使用程式預設。
          </p>
        </section>

        <section id="media-spec" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">9. 圖片與媒體規格</h2>

          <h3 className="kz-admin__guide-h3">9.1 上傳限制</h3>
          <table className="kz-admin__table">
            <thead>
              <tr><th>項目</th><th>規格</th></tr>
            </thead>
            <tbody>
              <tr><td>支援格式</td><td>JPEG、PNG、WebP、GIF</td></tr>
              <tr><td>上傳後處理</td><td>JPEG／PNG 自動轉為 WebP（縮小檔案、加快載入）</td></tr>
              <tr><td>單檔上限</td><td><strong>10 MB</strong></td></tr>
              <tr><td>儲存位置</td><td>Supabase Storage bucket <code>kz-cms</code></td></tr>
              <tr><td>資料夾</td><td><code>general</code>、<code>hero</code>、<code>journal</code>、<code>treatments</code>、<code>posters</code></td></tr>
            </tbody>
          </table>

          <h3 className="kz-admin__guide-h3">9.2 各版位建議比例</h3>
          <table className="kz-admin__table">
            <thead>
              <tr>
                <th>用途</th>
                <th>比例</th>
                <th>建議像素</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>醫美知識列表／內頁主圖</td><td>3 : 4</td><td>900 × 1200 px</td></tr>
              <tr><td>療程內頁主圖</td><td>3 : 4</td><td>900 × 1200 px</td></tr>
              <tr><td>療程列表縮圖</td><td>4 : 5</td><td>320 × 400 px</td></tr>
              <tr><td>短片封面</td><td>9 : 16</td><td>1080 × 1920 px</td></tr>
              <tr><td>品牌敘事／痛症服務圖</td><td>4 : 5</td><td>依設計稿</td></tr>
              <tr><td>主視覺輪播</td><td>16 : 9 或設計稿</td><td>1920 × 1080 px 起</td></tr>
            </tbody>
          </table>

          <h3 className="kz-admin__guide-h3">9.3 URL 格式</h3>
          <ul>
            <li><strong>站內靜態：</strong><code>/images/xxx.jpg</code></li>
            <li><strong>短片封面：</strong><code>/videos/reels/posters/1.jpg</code></li>
            <li><strong>Supabase：</strong><code>https://xxx.supabase.co/storage/v1/object/public/kz-cms/...</code></li>
          </ul>
        </section>

        <section id="video-spec" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">10. 影片規格</h2>
          <p>
            <strong>MP4 不經 CMS 上傳</strong>，請放在 <code>public/videos/reels/</code> 後部署。
            CMS 只管理清單資料（標題、路徑、排序）。
          </p>
          <table className="kz-admin__table">
            <thead>
              <tr><th>項目</th><th>規格</th></tr>
            </thead>
            <tbody>
              <tr><td>比例</td><td>9 : 16（直式短片）</td></tr>
              <tr><td>解析度</td><td>1080 × 1920（最低 720 × 1280）</td></tr>
              <tr><td>格式</td><td>MP4（H.264 + AAC）</td></tr>
              <tr><td>片長</td><td>15–90 秒</td></tr>
              <tr><td>大小建議</td><td>每支 ≤ 30 MB</td></tr>
            </tbody>
          </table>
        </section>

        <section id="journal" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">11. 醫美知識</h2>
          <p><strong>路徑：</strong> <Link href="/admin/journal">/admin/journal</Link> · 前台 <code>/journal</code></p>
          <table className="kz-admin__table">
            <thead>
              <tr><th>欄位</th><th>說明</th><th>必填</th></tr>
            </thead>
            <tbody>
              <tr><td>標題 title</td><td>建議 ≤ 60 字</td><td>是</td></tr>
              <tr><td>網址代碼</td><td>英文小寫＋連字號；留空依標題自動產生</td><td>新增可留空</td></tr>
              <tr><td>分類 category</td><td>出現在列表篩選</td><td>否</td></tr>
              <tr><td>發布日期</td><td><code>YYYY-MM-DD</code></td><td>否</td></tr>
              <tr><td>摘要 excerpt</td><td>列表與 SEO</td><td>否</td></tr>
              <tr><td>內文 body</td><td>每段空一行變獨立段落</td><td>否</td></tr>
              <tr><td>圖片 image / alt</td><td>建議 3:4</td><td>否</td></tr>
              <tr><td>狀態</td><td>published｜draft</td><td>是</td></tr>
            </tbody>
          </table>
        </section>

        <section id="treatments" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">12. 療程</h2>
          <p><strong>路徑：</strong> <Link href="/admin/treatments">/admin/treatments</Link> · 前台 <code>/treatments</code></p>
          <table className="kz-admin__table">
            <thead>
              <tr><th>欄位</th><th>說明</th></tr>
            </thead>
            <tbody>
              <tr><td>名稱 / 網址代碼 / 簡介 / 分類</td><td>基本資訊；網址代碼留空自動產生</td></tr>
              <tr><td>problems</td><td>逗號、頓號或「、」分隔多個標籤</td></tr>
              <tr><td>圖片</td><td>內頁 3:4、列表縮圖 4:5</td></tr>
              <tr><td>featured</td><td>勾選出現在首頁療程輪播</td></tr>
              <tr><td>price_type / price</td><td>consult 諮詢報價｜fixed 固定價格</td></tr>
              <tr><td>features</td><td>每行一項，變成列表</td></tr>
              <tr><td>status</td><td>published｜draft</td></tr>
            </tbody>
          </table>
        </section>

        <section id="videos" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">13. 店內短片</h2>
          <p><strong>路徑：</strong> <Link href="/admin/videos">/admin/videos</Link> · 前台首頁「店內日常」</p>
          <table className="kz-admin__table">
            <thead>
              <tr><th>欄位</th><th>說明</th></tr>
            </thead>
            <tbody>
              <tr><td>ID</td><td>整數；新增留空自動 +1</td></tr>
              <tr><td>標題 / 摘要 / 分類</td><td>分類：開店｜療程｜儀器｜日常｜產品｜門店</td></tr>
              <tr><td>poster / src</td><td>封面 9:16；影片如 <code>/videos/reels/3.mp4</code></td></tr>
              <tr><td>related_href</td><td>站內連結，如 <code>/treatments/collazen</code></td></tr>
              <tr><td>sort_order / status</td><td>排序；published｜draft</td></tr>
            </tbody>
          </table>
        </section>

        <section id="media-lib" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">14. 媒體庫</h2>
          <p><strong>路徑：</strong> <Link href="/admin/media">/admin/media</Link></p>
          <ul>
            <li>集中管理 CMS 上傳的圖片；可依資料夾篩選（general、hero、journal、treatments、posters）。</li>
            <li>JPEG／PNG 上傳後自動轉 WebP。</li>
            <li>Alt 文字會依檔名自動建議。</li>
            <li>列表可「複製 URL」或「刪除」（同時刪 Storage 檔案）。</li>
            <li>編輯文章／療程時也可直接上傳，無需先來媒體庫。</li>
          </ul>
        </section>

        <section id="faq" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">15. 常見問題（FAQ）</h2>
          <p><strong>路徑：</strong> <Link href="/admin/faq">/admin/faq</Link> · 前台 <code>/faq</code></p>
          <table className="kz-admin__table">
            <thead>
              <tr><th>欄位</th><th>說明</th></tr>
            </thead>
            <tbody>
              <tr><td>question / answer</td><td>問答文字；答案可含換行</td></tr>
              <tr><td>sort_order</td><td>整數，愈小愈前</td></tr>
              <tr><td>status</td><td>published｜draft</td></tr>
            </tbody>
          </table>
        </section>

        <section id="site" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">16. 站點設定</h2>
          <p><strong>路徑：</strong> <Link href="/admin/site">/admin/site</Link></p>
          <table className="kz-admin__table">
            <thead>
              <tr><th>欄位</th><th>範例</th><th>前台位置</th></tr>
            </thead>
            <tbody>
              <tr><td>顯示電話 phone</td><td>9770 9300</td><td>頁尾</td></tr>
              <tr><td>撥號用 phone_tel</td><td>85297709300</td><td>tel: 連結</td></tr>
              <tr><td>營業時間 hours</td><td>每日 09:00 – 21:00</td><td>頁尾</td></tr>
              <tr><td>地址 address</td><td>完整中文地址</td><td>頁尾、JSON-LD</td></tr>
              <tr><td>副標題 subtitle</td><td>屯門美容 · 皮膚管理 · 痛症理療</td><td>頁尾、首頁 SEO</td></tr>
              <tr><td>SEO 描述 description</td><td>約 80–160 字</td><td>首頁 SEO</td></tr>
              <tr><td>社群連結</td><td>完整 https URL</td><td>頁尾、JSON-LD</td></tr>
            </tbody>
          </table>
          <p className="kz-admin__guide-note">
            主視覺、內頁文案、首頁區塊等請至對應模組編輯；此頁主要管理全站聯絡資訊與社群。
          </p>
        </section>

        <section id="backup" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">17. 備份</h2>
          <p>
            開發者可在專案根目錄執行 <code>npm run backup:cms</code>，
            將 CMS 設定與列表資料匯出至 <code>backups/</code> 資料夾（JSON 格式）。
          </p>
          <p className="kz-admin__guide-note">
            此指令需本機環境變數與終端機存取，一般編輯者無需操作。
          </p>
        </section>

        <section id="limits" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">18. 容量與技術上限</h2>
          <table className="kz-admin__table">
            <thead>
              <tr><th>項目</th><th>上限</th></tr>
            </thead>
            <tbody>
              <tr><td>CMS 圖片單檔</td><td>10 MB</td></tr>
              <tr><td>CMS 圖片格式</td><td>JPEG、PNG、WebP、GIF（JPEG/PNG 自動轉 WebP）</td></tr>
              <tr><td>媒體庫選圖彈窗</td><td>最近 120 張</td></tr>
              <tr><td>MP4 影片</td><td>public/videos/reels/，建議每支 ≤ 30 MB</td></tr>
              <tr><td>Supabase Free 儲存</td><td>約 1 GB（kz-cms bucket）</td></tr>
              <tr><td>前台快取</td><td>約 60 秒後反映變更</td></tr>
            </tbody>
          </table>
        </section>

        <section id="frontend" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">19. 前台生效範圍</h2>
          <table className="kz-admin__table">
            <thead>
              <tr><th>前台頁面</th><th>CMS 資料來源</th></tr>
            </thead>
            <tbody>
              <tr><td>首頁主視覺</td><td>/admin/hero</td></tr>
              <tr><td>首頁各區塊</td><td>/admin/home-sections + 列表模組（療程、文章、短片）</td></tr>
              <tr><td>信任花瓣、流程、敘事、評價</td><td>/admin/content</td></tr>
              <tr><td>/skin-analysis、/wellness、/about 等</td><td>/admin/pages + /admin/content（痛症服務）</td></tr>
              <tr><td>/journal、/journal/[slug]</td><td>/admin/journal</td></tr>
              <tr><td>/treatments、/treatments/[slug]</td><td>/admin/treatments</td></tr>
              <tr><td>/faq</td><td>/admin/faq + /admin/pages（頁首／SEO）</td></tr>
              <tr><td>頁尾、JSON-LD</td><td>/admin/site</td></tr>
              <tr><td>各內頁 SEO meta</td><td>/admin/pages → SEO 區塊</td></tr>
              <tr><td>sitemap.xml</td><td>文章 + 療程 slug</td></tr>
            </tbody>
          </table>
          <p className="kz-admin__guide-note">
            若未設定 Supabase 環境變數，前台會自動使用 <code>src/data/</code> 內建靜態資料。
          </p>
        </section>

        <section id="troubleshooting" className="kz-admin__card kz-admin__guide-section">
          <h2 className="kz-admin__guide-h2">20. 疑難排解</h2>
          <table className="kz-admin__table">
            <thead>
              <tr><th>問題</th><th>可能原因與解法</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>儲存後前台沒變</td>
                <td>快取約 60 秒；請重新整理或稍候。確認已按「儲存」且看到綠色提示。</td>
              </tr>
              <tr>
                <td>切換內頁後欄位沒變</td>
                <td>請確認已從下拉選單選擇正確內頁；表單會隨選擇立即更新。</td>
              </tr>
              <tr>
                <td>欄位留空但前台仍顯示舊內容</td>
                <td>留空＝預設值，不是「清空」。若要移除自訂，請按「還原預設」。</td>
              </tr>
              <tr>
                <td>痛症服務改錯地方</td>
                <td>三項圖文服務在「共用文案區塊」；頁首與面板在「各頁標題與 SEO · 痛症理療」。</td>
              </tr>
              <tr>
                <td>圖片被裁切</td>
                <td>請依使用說明第 9 章比例出圖；前台多使用 object-fit: cover。</td>
              </tr>
              <tr>
                <td>無權限登入</td>
                <td>帳號需加入 kz_cms_admins；請聯絡網站管理員。</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
