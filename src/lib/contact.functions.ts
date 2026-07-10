import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().min(1).max(200),
  company: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(4000),
  lang: z.string().max(8).optional().default("en"),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      throw new Error("Telegram is not configured");
    }

    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const text =
      `🌲 <b>New request — CRYSTAL CLOUD</b>\n` +
      `<b>Lang:</b> ${esc(data.lang)}\n` +
      `<b>Name:</b> ${esc(data.name)}\n` +
      `<b>Email/Phone:</b> ${esc(data.email)}\n` +
      (data.company ? `<b>Company:</b> ${esc(data.company)}\n` : "") +
      `\n<b>Message:</b>\n${esc(data.message)}`;

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("Telegram sendMessage failed", res.status, body);
      throw new Error(`Telegram error ${res.status}`);
    }

    return { ok: true };
  });
