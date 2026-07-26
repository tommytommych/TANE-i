import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ご自身のGoogle AI StudioのAPIキー（AIzaSy...から始まるもの）をここに設定してください
const AI_API_KEY = process.env.GEMINI_API_KEY; 

const ai = new GoogleGenAI({ apiKey: AI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, generateImage, dailyImageCount } = await req.json();

    // 1. 画像生成（またはデザイン提案）が要求された場合
    if (generateImage) {
      if (dailyImageCount >= 5) {
        return NextResponse.json({ 
          reply: "本日の画像生成の上限（5枚）に達しました。明日またお試しください！" 
        });
      }

      // 通常のGeminiモデルで画像用の詳細なデザイン構成やアイデア、プロンプトを作成する
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `あなたはDIYのアダプター兼デザイナーです。ユーザーからの要望「${message}」に対して、DIYで作る際の具体的な木材のサイズ、組み立て手順、およびカッティングシート用デザインの構成案を、初心者にも分かりやすく詳細に提案してください。`,
      });

      const replyText = response.text || "デザイン案を作成しました。";

      return NextResponse.json({ 
        reply: `【AIからのDIYデザイン・構成提案】\n\n${replyText}`,
        incrementImageCount: true 
      });
    }

    // 2. 通常のテキストチャット（Difyへ送信）
    const DIFY_API_URL = "https://api.dify.ai/v1/chat-messages";
    const DIFY_API_KEY = "app-J9ZBwKZC3GCu2kGstQ8qQPAG";

    const apiResponse = await fetch(DIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DIFY_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: {},
        query: message || "こんにちは",
        response_mode: "blocking",
        user: "tomishin-user",
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      const errorMsg = data.message || JSON.stringify(data);
      return NextResponse.json({ reply: `Difyエラー: ${errorMsg}` });
    }

    const replyText = data.answer || data.data?.answer || "回答を取得できませんでした";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: `通信例外エラー: ${String(error)}` });
  }
}
