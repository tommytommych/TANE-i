'use client';

import { useState, useRef, useEffect } from 'react';

interface SavedItem {
  id: string;
  type: 'history' | 'design' | 'favorite';
  title: string;
  content: string;
  date: string;
}

const KOHNAN_WOOD_LIST = [
  { name: 'SPF材（1×4）', feature: 'DIYの定番。安価で加工しやすい。', size: '厚19×幅89mm', length: '910 / 1820mm', price: '約300〜500円' },
  { name: 'SPF材（2×4）', feature: '柱や棚などの構造材に最適。強度がある。', size: '厚38×幅89mm', length: '910 / 1820 / 2440mm', price: '約600〜900円' },
  { name: 'パイン集成材', feature: '家具や棚板に最適。木目が美しい。', size: '厚さ15 / 18 / 25mm、幅200〜600mm', length: '910 / 1820mm', price: '約1,200円〜' },
  { name: 'ラワン合板 / ベニヤ', feature: '背板や下地、箱物家具に。', size: '厚さ2.5 / 4 / 5.5 / 9 / 12mm', length: 'サブロク板（910×1820mm）', price: '約1,000円〜' },
  { name: 'OSB合板', feature: '無骨でおしゃれな内装やDIYに。', size: '厚さ9 / 11 / 12mm', length: 'サブロク板（910×1820mm）', price: '約1,500円〜' },
  { name: 'MDFボード', feature: '塗装やカッティングシートに最適。', size: '厚さ2.5 / 5.5 / 9 / 12mm', length: 'サブロク板（910×1820mm）', price: '約1,000円〜' },
];

const AMAZON_TOOLS = [
  { name: 'ゼットソー 9寸目 (ゼット販売)', url: 'https://amzn.to/4ufzAf9' },
  { name: 'Temple Tool 両刃鋸 240mm 替刃式', url: 'https://amzn.to/47JBBYY' },
  { name: 'Temple Tool ダボ切り鋸 150mm', url: 'https://amzn.to/4fW3FKS' },
  { name: '角利 ネールハンマー パイプ柄 275mm', url: 'https://amzn.to/4fW428e' },
  { name: 'シンワ測定 サンデーカーペンター 15×30', url: 'https://amzn.to/463bbAa' },
  { name: 'シンワ測定 止型スコヤ 金属製', url: 'https://amzn.to/4mUq3GD' },
  { name: 'シンワ測定 完全スコヤ 15cm', url: 'https://amzn.to/4n1spnm' },
  { name: 'ベッセル ボールグリップドライバー', url: 'https://amzn.to/464nV9H' },
  { name: 'シンワ測定 ブルーレベル Basic 300mm', url: 'https://amzn.to/41hPCt1' },
  { name: 'シンワ測定 直尺 シルバー ストッパー付', url: 'https://amzn.to/41WQP9g' },
  { name: 'シンワ測定 15×30 差金 定規', url: 'https://amzn.to/475FBCZ' },
  { name: 'ハンドサンダー サンドペーパーセット', url: 'https://amzn.to/45GFjjy' },
  { name: 'SK11 マイターボックス (のこぎりガイド)', url: 'https://amzn.to/4mqhvHH' },
  { name: 'コニシ ボンド 木工用速乾 500g', url: 'https://amzn.to/3HOMaPZ' },
  { name: 'マキタ ドライバドリル MDF001', url: 'https://amzn.to/41k057d' },
];

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: 'assistant',
      content: '🌱ようこそ、TANE:iへ。\nあなたの「作りたい」を、一緒にカタチにします。\n作りたいもの、悩んでいることを教えてください😊'
    }
  ]);
  const [input, setInput] = useState('');
  const [remainingCount, setRemainingCount] = useState(10);
  const [remainingImageCount, setRemainingImageCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaded = localStorage.getItem('tanei_saved_items');
    if (loaded) {
      try {
        setSavedItems(JSON.parse(loaded));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addItem = (type: 'history' | 'design' | 'favorite', title: string, content: string) => {
    const newItem: SavedItem = {
      id: Date.now().toString(),
      type,
      title,
      content,
      date: new Date().toLocaleDateString('ja-JP') + ' ' + new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newItem, ...savedItems];
    setSavedItems(updated);
    localStorage.setItem('tanei_saved_items', JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem('tanei_saved_items', JSON.stringify(updated));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (textToSend: string, countUp: boolean = false) => {
    if (!textToSend.trim() || isLoading) return;

    if (textToSend.includes('コーナン') && (textToSend.includes('木材') || textToSend.includes('価格') || textToSend.includes('サイズ') || textToSend.includes('リスト'))) {
      const woodText = KOHNAN_WOOD_LIST.map(w => `■ ${w.name}\n・特徴: ${w.feature}\n・サイズ: ${w.size}\n・長さ: ${w.length}\n・価格目安: ${w.price}\n`).join('\n');
      const replyText = `コーナンで取り扱われている代表的な木材のリストです。\n\n${woodText}\n（※価格は店舗や時期によって前後します。）`;
      
      const newMessages = [...messages, { role: 'user', content: textToSend }, { role: 'assistant', content: replyText }];
      setMessages(newMessages);
      setInput('');
      addItem('history', textToSend, replyText);
      if (countUp) setRemainingCount((prev) => Math.max(0, prev - 1));
      return;
    }

    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    if (countUp) {
      setRemainingCount((prev) => Math.max(0, prev - 1));
    }

    addItem('history', textToSend, textToSend);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      const replyText = data && data.reply ? data.reply : '回答を受け取れませんでした。';
      
      setMessages([...newMessages, { role: 'assistant', content: replyText }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: 'エラーが発生しました。通信環境やサーバーのログをご確認ください。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenGeminiImage = () => {
    if (remainingImageCount <= 0) {
      showToast('本日の画像生成回数が上限（5回）に達しました。');
      return;
    }

    const userInput = input.trim() || 'DIYの完成イメージ';
    const promptText = `画像生成：${userInput}`;

    navigator.clipboard.writeText(promptText).then(() => {
      showToast(`「${promptText}」をコピーしました！Geminiに貼り付けてください。`);
    }).catch(() => {
      showToast(`Geminiのページを開きます。`);
    });

    setRemainingImageCount((prev) => Math.max(0, prev - 1));
    window.open('https://gemini.google.com/', '_blank');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(input, true);
    }
  };

  const renderMessageContent = (content: string) => {
    if (!content) return null;
    return content.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
      part.match(/^https?:\/\//) ? (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{part}</a>
      ) : (part)
    );
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] text-[#4A3B32] font-sans relative overflow-hidden">
      {toastMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#5C4B40] text-white px-5 py-3 rounded-2xl shadow-xl text-sm flex items-center gap-3 animate-fade-in border border-[#8C6D53]">
          <span>🌱</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 左側サイドバー（折りたたみ対応） */}
      <div className={`${isLeftSidebarOpen ? 'w-80' : 'w-0'} bg-[#F4FEF6] border-r border-[#E6DEC9] flex flex-col justify-between overflow-y-auto flex-shrink-0 transition-all duration-300 relative`}>
        <div className={`p-6 space-y-6 ${isLeftSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}>
          
          {/* 左上のロゴ */}
          <div className="bg-gradient-to-r from-[#8C6D53] to-[#A3856A] p-4 rounded-2xl shadow-md text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black tracking-wider flex items-center gap-2 drop-shadow">
                <span>🌱</span> TANE:i
              </h1>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Pro</span>
            </div>
            <a 
              href="https://www.youtube.com/@tomishin_channel_DIY" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-white/90 mt-1.5 block hover:underline font-medium"
            >
              とみしんチャンネルDIY 公認アシスタント ＞
            </a>
          </div>

          <div className="bg-[#EBE3D5] p-3 rounded-xl border border-[#DDD3C7] space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>本日の無料相談回数</span>
              <span>{remainingCount} / 10回</span>
            </div>
            <div className="w-full bg-[#D4CBB8] h-2 rounded-full overflow-hidden">
              <div className="bg-[#8C6D53] h-full transition-all duration-300" style={{ width: `${(remainingCount / 10) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-[#EBE3D5] p-3 rounded-xl border border-[#DDD3C7] space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>本日の画像生成回数</span>
              <span>{remainingImageCount} / 5回</span>
            </div>
            <div className="w-full bg-[#D4CBB8] h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 h-full transition-all duration-300" style={{ width: `${(remainingImageCount / 5) * 100}%` }}></div>
            </div>
          </div>

          {/* クイックアクセス */}
          <div>
            <div className="text-xs font-bold text-[#5C4B40] px-1 mb-2">⚡ クイックアクセス</div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => sendMessage("DIYの相談をしたいです", false)} className="bg-white hover:bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E6DEC9] text-left transition-all shadow-sm group">
                <span className="text-base block mb-1">💬</span>
                <span className="text-xs font-bold text-[#5C4B40] group-hover:text-[#8C6D53]">DIY相談</span>
              </button>
              <button onClick={() => sendMessage("作品の設計を手伝ってほしいです。大まかなイメージから具体的な設計案を提案してください。", false)} className="bg-white hover:bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E6DEC9] text-left transition-all shadow-sm group">
                <span className="text-base block mb-1">📐</span>
                <span className="text-xs font-bold text-[#5C4B40] group-hover:text-[#8C6D53]">設計する</span>
              </button>
              <button onClick={() => sendMessage("木取り図を作ってほしいです", false)} className="bg-white hover:bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E6DEC9] text-left transition-all shadow-sm group">
                <span className="text-base block mb-1">📋</span>
                <span className="text-xs font-bold text-[#5C4B40] group-hover:text-[#8C6D53]">木取り図</span>
              </button>
              <button onClick={() => sendMessage("コーナンの木材の種類と価格リストを教えて", false)} className="bg-white hover:bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E6DEC9] text-left transition-all shadow-sm group">
                <span className="text-base block mb-1">🪵</span>
                <span className="text-xs font-bold text-[#5C4B40] group-hover:text-[#8C6D53]">木材リスト</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E6DEC9] flex flex-col gap-1.5">
            <div className="text-xs font-bold text-[#5C4B40] px-3 mb-1">メニュー</div>

            <button onClick={() => sendMessage("初心者におすすめの工具を教えて", false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm bg-white hover:bg-[#FAF6F0] text-[#5C4B40] transition-colors w-full text-left">
              <span>🔧</span> おすすめ工具
            </button>

            <button onClick={() => sendMessage("材料の選び方とコツを教えてください。", false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm bg-white hover:bg-[#FAF6F0] text-[#5C4B40] transition-colors w-full text-left">
              <span>🔍</span> 材料の選び方とコツ
            </button>

            <button onClick={() => sendMessage("【カッティングデザインの相談】シルエットカメオ用のステッカーやロゴのデザインアイデアを提案してください。", false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm bg-white hover:bg-[#FAF6F0] text-[#5C4B40] transition-colors w-full text-left">
              <span>✂️</span> シルエットカメオデザイン
            </button>
          </div>

          <div className="pt-2 border-t border-[#E6DEC9] flex flex-col gap-1.5">
            <div className="text-xs font-bold text-[#5C4B40] px-3 mb-1">👤 マイページ</div>
            <button onClick={() => setActiveModal('favorite')} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm bg-white hover:bg-[#FAF6F0] text-[#5C4B40] transition-colors w-full text-left">⭐ お気に入り</button>
            <button onClick={() => setActiveModal('design')} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm bg-white hover:bg-[#FAF6F0] text-[#5C4B40] transition-colors w-full text-left">💾 保存した設計・アイデア</button>
            <button onClick={() => setActiveModal('history')} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm bg-white hover:bg-[#FAF6F0] text-[#5C4B40] transition-colors w-full text-left">🕒 履歴</button>
          </div>

          {/* おすすめDIY情報 */}
          <div className="pt-2 border-t border-[#E6DEC9]">
            <h3 className="text-xs font-bold text-[#5C4B40] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>📺</span> おすすめDIY情報
            </h3>
            <a
              href="https://www.youtube.com/@tomishin_channel_DIY"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl border border-[#E6DEC9] hover:border-[#8C6D53] transition-all group shadow-sm overflow-hidden"
            >
              <div className="w-full h-24 bg-gradient-to-br from-[#00A4CC] to-[#007A99] p-3 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-bold">YouTube</span>
                  <span className="text-base">🖌️</span>
                </div>
                <div>
                  <div className="text-[10px] opacity-90">初心者向け木工DIY</div>
                  <div className="text-xs font-bold tracking-wide">とみしんチャンネルDIY</div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-[11px] font-bold text-[#8C6D53] mb-1 group-hover:underline">チャンネル登録してチェック！</div>
                <p className="text-[10px] text-[#7A6B5D] leading-relaxed">初心者向けの分かりやすいDIY動画や木工アイデアを配信中！</p>
              </div>
            </a>
          </div>

          {/* ご意見・ご感想ボックス（左下に追加） */}
          <div className="pt-2 border-t border-[#E6DEC9]">
            <h3 className="text-xs font-bold text-[#5C4B40] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>📮</span> ご意見・ご感想
            </h3>
            <a
              href="https://forms.gle/your-google-form-link" // ←お使いのGoogleフォーム等のURLに変更してください
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white hover:bg-[#FAF6F0] p-3 rounded-xl border border-[#E6DEC9] hover:border-[#8C6D53] transition-all shadow-sm group text-center"
            >
              <div className="text-xs font-bold text-[#5C4B40] group-hover:text-[#8C6D53] mb-1">
                ご意見・ご感想はこちら 💬
              </div>
              <p className="text-[10px] text-[#7A6B5D] leading-relaxed">
                「こんな機能が欲しい」「使いやすいよ」など、ぜひお気軽にお聞かせください！
              </p>
            </a>
          </div>

        </div>
      </div>

      {/* メインチャット画面 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* トップバー（サイドバー開閉ボタン付き） */}
        <div className="h-14 bg-white border-b border-[#E6DEC9] px-6 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#F4FEF6] border border-[#E6DEC9] rounded-xl text-xs font-bold text-[#5C4B40] hover:bg-[#EBE3D5] transition-colors"
          >
            <span>{isLeftSidebarOpen ? '◀ サイドバーを隠す' : '▶ メニューを開く'}</span>
          </button>
          <div className="text-xs text-[#7A6B5D] font-bold">
            🌱 TANE:i アシスタント
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <div className="w-full max-w-none space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-5xl w-full p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-[#8C6D53] text-white ml-auto' : 'bg-white border border-[#E6DEC9] text-[#4A3B32] mr-auto shadow-sm'}`}>
                  <div className="whitespace-pre-wrap mb-2">
                    {renderMessageContent(msg.content)}
                  </div>
                </div>

                {msg.role === 'assistant' && index > 0 && (
                  <div className="flex gap-2 mt-1 ml-1">
                    <button onClick={() => { addItem('favorite', 'お気に入り回答', msg.content); showToast('お気に入りに保存しました！'); }} className="text-xs bg-[#EBE3D5] hover:bg-[#DDD3C7] text-[#5C4B40] px-2 py-1 rounded-md transition-colors">⭐ お気に入りに追加</button>
                    <button onClick={() => { addItem('design', '保存した設計・アイデア', msg.content); showToast('設計・アイデアとして保存しました！'); }} className="text-xs bg-[#EBE3D5] hover:bg-[#DDD3C7] text-[#5C4B40] px-2 py-1 rounded-md transition-colors">💾 保存する</button>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E6DEC9] text-[#7A6B5D] p-4 rounded-2xl text-sm animate-pulse flex items-center gap-2 shadow-sm">
                  <span>🌱</span>
                  <span>TANE:iが考えています…</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 入力エリア */}
        <div className="px-6 py-4 bg-white border-t border-[#E6DEC9]">
          <div className="w-full max-w-none flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="例：ヴィンテージ風のカフェテーブル、カッティング用の星マーク、など"
              disabled={isLoading}
              className="flex-1 border border-[#E6DEC9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6D53] disabled:opacity-50 min-w-0"
            />
            <button
              onClick={() => sendMessage(input, true)}
              disabled={isLoading}
              className="bg-[#8C6D53] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#7A5D43] transition-colors disabled:opacity-50 flex-shrink-0"
            >
              送信
            </button>
            
            <button
              onClick={handleOpenGeminiImage}
              disabled={isLoading || remainingImageCount <= 0}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-500/25 px-5 py-3 rounded-xl text-sm font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex-shrink-0 flex items-center gap-1.5 border border-white/20"
              title="入力欄の文字の頭に「画像生成：」をつけてコピーし、Geminiを開きます"
            >
              <span>✨</span>
              <span>Gemini画像生成</span>
            </button>
          </div>
        </div>
      </div>

      {/* 右側サイドバー */}
      <div className="w-80 bg-[#F4FEF6] border-l border-[#E6DEC9] p-6 hidden xl:flex flex-col gap-6 overflow-y-auto flex-shrink-0">
        {/* 木材価格・寸法早見表 */}
        <div>
          <h3 className="text-xs font-bold text-[#5C4B40] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>🪵</span> 木材価格・寸法早見表
          </h3>
          <div className="bg-white p-3 rounded-xl border border-[#E6DEC9] text-xs space-y-2.5 text-[#5C4B40]">
            <div className="border-b border-gray-100 pb-2">
              <span className="font-bold block text-[#8C6D53]">SPF材 (1×4)</span>
              <span className="text-[11px] text-gray-600 block">寸法: 厚19×幅89mm / 長さ: 910/1820mm</span>
              <span className="text-[11px] text-gray-500">目安: 約300〜500円（定番・加工しやすい）</span>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <span className="font-bold block text-[#8C6D53]">SPF材 (2×4)</span>
              <span className="text-[11px] text-gray-600 block">寸法: 厚38×幅89mm / 長さ: 910/1820/2440mm</span>
              <span className="text-[11px] text-gray-500">目安: 約600〜900円（柱・棚の構造材に最適）</span>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <span className="font-bold block text-[#8C6D53]">パイン集成材 (厚18mm)</span>
              <span className="text-[11px] text-gray-600 block">寸法: 厚18×幅200〜600mm / 長さ: 910/1820mm</span>
              <span className="text-[11px] text-gray-500">目安: 約1,200円〜（家具・棚板に最適）</span>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <span className="font-bold block text-[#8C6D53]">ラワン合板 / ベニヤ</span>
              <span className="text-[11px] text-gray-600 block">寸法: 厚2.5〜12mm / 長さ: 910×1820mm</span>
              <span className="text-[11px] text-gray-500">目安: 約1,000円〜（背板・下地向け）</span>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <span className="font-bold block text-[#8C6D53]">OSB合板</span>
              <span className="text-[11px] text-gray-600 block">寸法: 厚9〜12mm / 長さ: 910×1820mm</span>
              <span className="text-[11px] text-gray-500">目安: 約1,500円〜（無骨でおしゃれ）</span>
            </div>
            <div>
              <span className="font-bold block text-[#8C6D53]">MDFボード</span>
              <span className="text-[11px] text-gray-600 block">寸法: 厚2.5〜12mm / 長さ: 910×1820mm</span>
              <span className="text-[11px] text-gray-500">目安: 約1,000円〜（塗装・カッティングに）</span>
            </div>
          </div>
        </div>

        {/* Amazonアフィリエイトツール */}
        <div>
          <h3 className="text-xs font-bold text-[#5C4B40] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>🛒</span> おすすめDIY工具・アイテム
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {AMAZON_TOOLS.map((tool, idx) => (
              <a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-2.5 rounded-xl border border-[#E6DEC9] hover:border-[#FF9900] transition-all shadow-sm group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#5C4B40] group-hover:text-[#FF9900] truncate mr-2">
                    {tool.name}
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded flex-shrink-0 font-bold">
                    Amazon ＞
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* スポンサー */}
        <div>
          <h3 className="text-xs font-bold text-[#5C4B40] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>📢</span> スポンサー
          </h3>
          <div className="space-y-2.5">
            <a 
              href="https://www.kohnan-eshop.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-blue-600 hover:bg-blue-700 rounded-xl p-3 text-center shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-white group-hover:underline">ホームセンター コーナン</div>
              <div className="text-[10px] text-blue-100 mt-1">DIY・木材・工具の調達に！</div>
            </a>
            <div className="block bg-white rounded-xl border border-dashed border-[#C9BFA8] p-3 text-center shadow-sm">
              <div className="text-xs font-bold text-[#7A6B5D]">スポンサー募集中（準備中）</div>
              <div className="text-[10px] text-gray-400 mt-1">ここにバナーや広告が掲載されます</div>
            </div>
            <div className="block bg-white rounded-xl border border-dashed border-[#C9BFA8] p-3 text-center shadow-sm">
              <div className="text-xs font-bold text-[#7A6B5D]">スポンサー募集中（準備中）</div>
              <div className="text-[10px] text-gray-400 mt-1">ここにバナーや広告が掲載されます</div>
            </div>
          </div>
        </div>
      </div>

      {/* マイページモーダル */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
            <div className="p-4 bg-[#F4FEF6] border-b border-[#E6DEC9] flex justify-between items-center">
              <h3 className="font-bold text-[#5C4B40] text-lg">
                {activeModal === 'favorite' && '⭐ お気に入り'}
                {activeModal === 'design' && '💾 保存した設計・アイデア'}
                {activeModal === 'history' && '🕒 相談履歴'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-black font-bold px-3 py-1 rounded-lg">✕ 閉じる</button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {savedItems.filter(item => item.type === activeModal).length === 0 ? (
                <p className="text-center text-gray-400 py-10 text-sm">まだ保存されているデータはありません。</p>
              ) : (
                savedItems.filter(item => item.type === activeModal).map(item => (
                  <div key={item.id} className="border border-[#E6DEC9] p-4 rounded-xl bg-[#FDFBF7] flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{item.date}</span>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline">削除</button>
                    </div>
                    <div className="text-sm font-bold text-[#4A3B32]">{item.title}</div>
                    <div className="text-sm text-[#5C4B40] whitespace-pre-wrap bg-white p-3 rounded-lg border border-[#E6DEC9]">
                      {item.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
