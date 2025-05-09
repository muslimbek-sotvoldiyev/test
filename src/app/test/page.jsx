"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { CodeBlock } from "@/components/code-block"

const questions = [
  {
    id: 1,
    type: "closed",
    question: "HTML nima?",
    options: ["Gipermatnli belgilash tili", "Yuqori darajali dasturlash tili", "Grafik muharrir", "Brauzer"],
    correctAnswer: "Gipermatnli belgilash tili",
  },
  {
    id: 2,
    type: "closed",
    question: "HTML hujjatning asosiy tarkibiy qismlari qaysilar?",
    code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>Sahifa sarlavhasi</title>\n</head>\n<body>\n  <h1>Salom, dunyo!</h1>\n</body>\n</html>",
    options: ["<head> va <body>", "<title> va <p>", "<html>, <head> va <body>", "<doctype>, <html> va <script>"],
    correctAnswer: "<html>, <head> va <body>",
  },
  {
    id: 3,
    type: "closed",
    question: "HTML hujjatni qaysi teg ochadi va yopadi?",
    code: "<!DOCTYPE html>\n<html>\n  <!-- Sahifa kodi -->\n</html>",
    options: ["<body></body>", "<head></head>", "<html></html>", "<doctype></doctype>"],
    correctAnswer: "<html></html>",
  },
  {
    id: 4,
    type: "closed",
    question: "<head> tegida qaysi element bo'lishi shart?",
    code: "<head>\n  <title>Sahifa sarlavhasi</title>\n  <meta charset=\"UTF-8\">\n</head>",
    options: ["<meta>", "<title>", "<link>", "<script>"],
    correctAnswer: "<title>",
  },
  {
    id: 5,
    type: "closed",
    question: "HTML5 hujjat deklaratsiyasi qanday yoziladi?",
    code: "<!DOCTYPE html>\n<html>\n  <!-- Sahifa kodi -->\n</html>",
    options: ["<!DOCTYPE html>", "<DOCTYPE HTML5>", "<html version=\"5.0\">", "<!DOCTYPE html5>"],
    correctAnswer: "<!DOCTYPE html>",
  },
  {
    id: 6,
    type: "closed",
    question: "HTML da izoh qanday yoziladi?",
    code: "<!-- Bu HTML izoh -->",
    options: ["// Bu izoh", "/* Bu izoh */", "<!-- Bu izoh -->", "<comment>Bu izoh</comment>"],
    correctAnswer: "<!-- Bu izoh -->",
  },
  {
    id: 7,
    type: "closed",
    question: "Quyidagilardan qaysi biri blok darajali element?",
    code: "<div>Blok element</div>\n<span>Inline element</span>",
    options: ["<span>", "<a>", "<div>", "<strong>"],
    correctAnswer: "<div>",
  },
  {
    id: 8,
    type: "closed",
    question: "Quyidagilardan qaysi biri ichki (inline) darajali element?",
    code: "<div>Blok element</div>\n<span>Inline element</span>",
    options: ["<p>", "<h1>", "<div>", "<em>"],
    correctAnswer: "<em>",
  },
  {
    id: 9,
    type: "closed",
    question: "Matnni qalin qilish uchun qaysi teg ishlatiladi?",
    code: "<b>Qalin matn</b>\n<strong>Muhim matn</strong>",
    options: ["<i>", "<b> yoki <strong>", "<u>", "<em>"],
    correctAnswer: "<b> yoki <strong>",
  },
  {
    id: 10,
    type: "closed",
    question: "Matnni tagiga chiziq chizish uchun qaysi teg ishlatiladi?",
    code: "<u>Tagiga chizilgan matn</u>",
    options: ["<u>", "<s>", "<line>", "<under>"],
    correctAnswer: "<u>",
  },
  {
    id: 11,
    type: "closed",
    question: "Tartibli ro'yxat yaratish uchun qaysi teg ishlatiladi?",
    code: "<ol>\n  <li>Birinchi element</li>\n  <li>Ikkinchi element</li>\n</ol>",
    options: ["<ul>", "<ol>", "<dl>", "<list>"],
    correctAnswer: "<ol>",
  },
  {
    id: 12,
    type: "closed",
    question: "Ro'yxat elementlarini belgilash uchun qaysi teg ishlatiladi?",
    code: "<ul>\n  <li>Element</li>\n</ul>",
    options: ["<li>", "<item>", "<el>", "<i>"],
    correctAnswer: "<li>",
  },
  {
    id: 13,
    type: "closed",
    question: "Havola (giperyoʻllanma) yaratish uchun qaysi teg ishlatiladi?",
    code: "<a href=\"https://example.com\">Havola</a>",
    options: ["<link>", "<href>", "<a>", "<url>"],
    correctAnswer: "<a>",
  },
  {
    id: 14,
    type: "closed",
    question: "Havolaning asosiy atributi qaysi?",
    code: "<a href=\"https://example.com\">Havola</a>",
    options: ["src", "href", "link", "target"],
    correctAnswer: "href",
  },
  {
    id: 15,
    type: "closed",
    question: "Yangi oynada ochiluvchi havola yaratish uchun qaysi atribut ishlatiladi?",
    code: "<a href=\"https://example.com\" target=\"_blank\">Yangi oynada oching</a>",
    options: ["new=\"true\"", "window=\"new\"", "target=\"_blank\"", "open=\"new\""],
    correctAnswer: "target=\"_blank\"",
  },
  {
    id: 16,
    type: "closed",
    question: "Rasmni joylashtirish uchun qaysi teg ishlatiladi?",
    code: "<img src=\"rasm.jpg\" alt=\"Tavsif\">",
    options: ["<img>", "<picture>", "<image>", "<graphic>"],
    correctAnswer: "<img>",
  },
  {
    id: 17,
    type: "closed",
    question: "Video joylashtirish uchun qaysi teg ishlatiladi?",
    code: "<video src=\"video.mp4\" controls></video>",
    options: ["<movie>", "<media>", "<video>", "<play>"],
    correctAnswer: "<video>",
  },
  {
    id: 18,
    type: "closed",
    question: "Audio fayllarni joylashtirish uchun qaysi teg ishlatiladi?",
    code: "<audio src=\"audio.mp3\" controls></audio>",
    options: ["<sound>", "<audio>", "<music>", "<mp3>"],
    correctAnswer: "<audio>",
  },
  {
    id: 19,
    type: "closed",
    question: "Tashqi resurslarni bog'lash uchun <img> tegining qaysi atributi ishlatiladi?",
    code: "<img src=\"rasm.jpg\" alt=\"Tavsif\">",
    options: ["href", "link", "src", "source"],
    correctAnswer: "src",
  },
  {
    id: 20,
    type: "closed",
    question: "Rasmning tavsiflovchi matnini qaysi atribut orqali beriladi?",
    code: "<img src=\"rasm.jpg\" alt=\"Tavsif matn\">",
    options: ["title", "alt", "description", "name"],
    correctAnswer: "alt",
  },
  {
    id: 21,
    type: "closed",
    question: "Jadval yaratish uchun qaysi teg ishlatiladi?",
    code: "<table>\n  <tr>\n    <td>Ma'lumot</td>\n  </tr>\n</table>",
    options: ["<table>", "<grid>", "<tab>", "<sheet>"],
    correctAnswer: "<table>",
  },
  {
    id: 22,
    type: "closed",
    question: "Jadval satrini yaratish uchun qaysi teg ishlatiladi?",
    code: "<table>\n  <tr>\n    <td>Ma'lumot</td>\n  </tr>\n</table>",
    options: ["<tr>", "<row>", "<trow>", "<line>"],
    correctAnswer: "<tr>",
  },
  {
    id: 23,
    type: "closed",
    question: "Jadval katakchasini yaratish uchun qaysi teg ishlatiladi?",
    code: "<table>\n  <tr>\n    <td>Ma'lumot</td>\n  </tr>\n</table>",
    options: ["<td>", "<cell>", "<tc>", "<field>"],
    correctAnswer: "<td>",
  },
  {
    id: 24,
    type: "closed",
    question: "Jadvalning sarlavha qismini belgilash uchun qaysi teg ishlatiladi?",
    code: "<table>\n  <tr>\n    <th>Sarlavha</th>\n  </tr>\n  <tr>\n    <td>Ma'lumot</td>\n  </tr>\n</table>",
    options: ["<th>", "<thead>", "<header>", "<caption>"],
    correctAnswer: "<th>",
  },
  {
    id: 25,
    type: "closed",
    question: "Jadval ustunlarini birlashtirish uchun qaysi atribut ishlatiladi?",
    code: "<table>\n  <tr>\n    <td colspan=\"2\">Birlashgan katak</td>\n  </tr>\n</table>",
    options: ["rowspan", "colspan", "merge", "combine"],
    correctAnswer: "colspan",
  },
  {
    id: 26,
    type: "closed",
    question: "Forma yaratish uchun qaysi teg ishlatiladi?",
    code: "<form action=\"submit.php\" method=\"post\">\n  <!-- forma elementlari -->\n</form>",
    options: ["<input>", "<button>", "<form>", "<control>"],
    correctAnswer: "<form>",
  },
  {
    id: 27,
    type: "closed",
    question: "Foydalanuvchidan matn kiritishini so'rash uchun qaysi element ishlatiladi?",
    code: "<input type=\"text\" placeholder=\"Matn kiriting\">",
    options: ["<text>", "<input type=\"text\">", "<textarea>", "<field>"],
    correctAnswer: "<input type=\"text\">",
  },
  {
    id: 28,
    type: "closed",
    question: "Tugma yaratish uchun qaysi teg ishlatiladi?",
    code: "<button type=\"submit\">Yuborish</button>",
    options: ["<btn>", "<button>", "<submit>", "<control>"],
    correctAnswer: "<button>",
  },
  {
    id: 29,
    type: "closed",
    question: "Foydalanuvchiga bir nechta variantlardan bir nechtagini tanlash imkonini beruvchi element qaysi?",
    code: "<input type=\"checkbox\" name=\"tillar\" value=\"html\"> HTML<br>\n<input type=\"checkbox\" name=\"tillar\" value=\"css\"> CSS",
    options: ["<radio>", "<select multiple>", "<input type=\"checkbox\">", "<choice>"],
    correctAnswer: "<input type=\"checkbox\">",
  },
  {
    id: 30,
    type: "closed",
    question: "Formadagi ma'lumotlarni serverga yuborish uchun qaysi atribut ishlatiladi?",
    code: "<form action=\"process.php\" method=\"post\">\n  <!-- forma elementlari -->\n</form>",
    options: ["method", "action", "submit", "send"],
    correctAnswer: "action",
  },
]

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // Check if user data exists
    const storedUserData = sessionStorage.getItem("userData")
    if (!storedUserData) {
      router.push("/register")
      return
    }

    setUserData(JSON.parse(storedUserData))
  }, [router])

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unansweredQuestions = questions.filter((q) => !answers[q.id])

    if (unansweredQuestions.length > 0) {
      toast.error("Barcha savollarga javob bering", {
        description: `${unansweredQuestions.length} ta savol javobsiz qoldi`,
      })
      return
    }

    setLoading(true)

    try {
      // Prepare data for submission
      const submissionData = {
        userData,
        answers: questions.map((q) => ({
          questionId: q.id,
          question: q.question,
          answer: answers[q.id],
          type: q.type,
          correctAnswer: q.correctAnswer,
        })),
      }

      // Send data to API
      const response = await fetch("/api/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        throw new Error("Natijalarni yuborishda xatolik yuz berdi")
      }

      // Store results in session storage for results page
      sessionStorage.setItem("testResults", JSON.stringify(submissionData))

      // Navigate to results page
      router.push("/results")
    } catch (error) {
      console.error(error)
      toast.error("Xatolik", {
        description: "Natijalarni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!userData) {
    return <div className="container mx-auto px-4 py-12 text-center">Yuklanmoqda...</div>
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle>
              Savol {currentQuestion + 1}/{questions.length}
            </CardTitle>
            <span className="text-sm text-gray-500">
              {userData.firstName} {userData.lastName}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <CardDescription className="mt-4 text-lg">{currentQ.question}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentQ.code && (
            <div className="mb-4 overflow-x-auto">
              <CodeBlock code={currentQ.code} />
            </div>
          )}
          <RadioGroup value={answers[currentQ.id] || ""} onValueChange={handleAnswerChange} className="space-y-3">
            {currentQ.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Oldingi
          </Button>
          <div>
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Yuklanmoqda..." : "Testni yakunlash"}
              </Button>
            ) : (
              <Button onClick={handleNext}>Keyingi</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
