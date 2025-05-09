import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const data = await request.json()

    // Here you would normally send the data to your Telegram bot
    // For this example, we'll just log it and return success
    console.log("Test submission received:", data)

    // Example of how you would send to Telegram bot
    // Replace BOT_TOKEN and CHAT_ID with your actual values
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (telegramBotToken && telegramChatId) {
      // Format message for Telegram
      const { userData, answers } = data

      // Calculate score
      const totalQuestions = answers.length
      const correctAnswers = answers.filter((a) => a.answer === a.correctAnswer)
      const score = Math.round((correctAnswers.length / totalQuestions) * 100)

      let message = `🎓 *Yangi test natijasi*\n\n`
      message += `*O'quvchi:* ${userData.firstName} ${userData.lastName}\n`
      message += `*Telefon:* ${userData.phone}\n\n`
      message += `*Natijalar:* ${correctAnswers.length}/${totalQuestions} (${score}%)\n\n`

      // Add first 10 answers (to avoid message length limits)
      answers.slice(0, 30).forEach((answer, index) => {
        message += `${index + 1}. ${answer.question.substring(0, 30)}...\n`
        message += `Javob: ${answer.answer}\n`
        message +=
          answer.answer === answer.correctAnswer
            ? "✅ To'g'ri\n\n"
            : `❌ Noto'g'ri (To'g'ri javob: ${answer.correctAnswer})\n\n`
      })

      if (answers.length > 10) {
        message += `... va yana ${answers.length - 10} ta savol\n\n`
      }

      message += `*Umumiy ball:* ${score}%`

      // Send to Telegram
      try {
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
            parse_mode: "Markdown",
          }),
        })
      } catch (error) {
        console.error("Error sending to Telegram:", error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing test submission:", error)
    return NextResponse.json({ error: "Failed to process test submission" }, { status: 500 })
  }
}
