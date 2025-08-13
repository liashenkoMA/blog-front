export async function telegramBot(formData: FormData) {
  const email = formData.get("email");
  const name = formData.get("name");
  const message = formData.get("message");

  const messageData = `
    Новое сообщение:
    Имя: ${name}
    Почта: ${email}
    Сообщение: ${message}
    `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: messageData,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Ошибка при отправке сообщения в Telegram:", err);
    return null;
  }
}
