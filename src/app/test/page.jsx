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

// Python test questions with correct answers marked
const questions = [
  {
    id: 1,
    type: "closed",
    question: 'for num in range(2,-5,-1): print(num, end=", ") kodi natijasi nima?',
    code: 'for num in range(2,-5,-1): print(num, end=", ")',
    options: ["2,3,4,5", "2, 1, 0, -1, -2, -3, -4", "2, 1,0", "2, 1, 0, -1, -2, -3, -4, -5"],
    correctAnswer: "2, 1, 0, -1, -2, -3, -4",
  },
  {
    id: 2,
    type: "closed",
    question: "Quyidagi kod nimani aks ettiradi:",
    code: "dct = {'Monday':1, 'Tuesday':2, 'Wednesday':3}\nprint(dct.get('Mondays', 'Not found'))",
    options: ["1", "Not found", "[1]", "'Not found'"],
    correctAnswer: "Not found",
  },
  {
    id: 3,
    type: "closed",
    question: "Bo'sh to'plam yaratish uchun qaysi biri ishlatiladi?",
    options: ["()", "{}", "[]", "set()"],
    correctAnswer: "set()",
  },
  {
    id: 4,
    type: "closed",
    question: "Quyidagi kod natijasi nima?",
    code: "set1 = set([10, 20, 30])\nset2 = set([100, 200, 300])\nset3 = set1.union(set2)",
    options: ["{[20, 100, 200, 10, 300, 30]}", "none", "[20, 100, 200, 10, 300, 30]", "{20, 100, 200, 10, 300, 30}"],
    correctAnswer: "{20, 100, 200, 10, 300, 30}",
  },
  {
    id: 5,
    type: "closed",
    question: "values = [2, 4, 6, 8, 10] print(values[1:3]) natijasi:",
    code: "values = [2, 4, 6, 8, 10]\nprint(values[1:3])",
    options: ["(4,6)", "[4;6]", "[4,6]", "none"],
    correctAnswer: "[4,6]",
  },
  {
    id: 6,
    type: "closed",
    question: "set1 = set([1, 2, 3, 4]), set2 = set([3, 4, 5, 6]), set3 = set1.difference(set2), print(set3)",
    code: "set1 = set([1, 2, 3, 4])\nset2 = set([3, 4, 5, 6])\nset3 = set1.difference(set2)\nprint(set3)",
    options: ["(3,4)", "{1,2,3,4,5,6}", "{5,6}", "{1,2}"],
    correctAnswer: "{1,2}",
  },
  {
    id: 7,
    type: "closed",
    question: "Ro'yxatdan qisman nusxa olish uchun to'g'ri sintaksis?",
    options: ["remove()", "list[start:end]", "copy [start:end]", "sorted [list:key]"],
    correctAnswer: "list[start:end]",
  },
  {
    id: 8,
    type: "closed",
    question: "myset = set(['www', 'xxx', 'yyy', 'zzz']) print(myset)",
    code: "myset = set(['www', 'xxx', 'yyy', 'zzz'])\nprint(myset)",
    options: ["{'yyy', 'xxx', 'zzz', 'www'}", "{['x','y','z','w']}", "{'x','y','z','w'}", "['w','x','y','z']"],
    correctAnswer: "{'yyy', 'xxx', 'zzz', 'www'}",
  },
  {
    id: 9,
    type: "closed",
    question: "'Labrador' so'zini ro'yxat boshiga qo'shish:",
    options: [
      "mylist.append('Labrador')",
      "mylist.append(Labrador)",
      "mylist[0]= Labrador",
      'mylist.insert(0, "Labrador")',
    ],
    correctAnswer: 'mylist.insert(0, "Labrador")',
  },
  {
    id: 10,
    type: "closed",
    question: "a=['bir', 'ikki', 'uch', 'tort', 'besh', 'olti'] print(a[4::-2])",
    code: "a=['bir', 'ikki', 'uch', 'tort', 'besh', 'olti']\nprint(a[4::-2])",
    options: ["['tort', 'ikki']", "['tort', 'olti']", "['besh', 'uch', 'bir']", "['besh']"],
    correctAnswer: "['besh', 'uch', 'bir']",
  },
  {
    id: 11,
    type: "closed",
    question: "Quyidagi kod natijasi nima?",
    code: "p = 23\ns = 0\nfor x in range(10):\n    if x % 2:\n        continue\n    elif x == 7:\n        break\n    else:\n        print(s)\n    p += s\n    s += s",
    options: ["51", "43", "0", "23"],
    correctAnswer: "0",
  },
  {
    id: 12,
    type: "closed",
    question: "Ro'yxat uzunligini topuvchi funksiya:",
    options: ["len()", "lenght()", "lens()", "lenghof()"],
    correctAnswer: "len()",
  },
  {
    id: 13,
    type: "closed",
    question: "son = list(range(2,6,2)) print(son)",
    code: "son = list(range(2,6,2))\nprint(son)",
    options: ["none", "[2,2,4,4]", "[2,4]", "[2,4,6]"],
    correctAnswer: "[2,4]",
  },
  {
    id: 14,
    type: "closed",
    question: "print(a[4::-2])",
    code: "a=['bir', 'ikki', 'uch', 'tort', 'besh', 'olti']\nprint(a[4::-2])",
    options: ["['tort', 'ikki']", "['tort', 'olti']", "['besh', 'uch', 'bir']", "['besh']"],
    correctAnswer: "['besh', 'uch', 'bir']",
  },
  {
    id: 15,
    type: "closed",
    question: "son = list(range(2,6,2)) print(son)",
    code: "son = list(range(2,6,2))\nprint(son)",
    options: ["none", "[2,2,4,4]", "[2,4]", "[2,4,6]"],
    correctAnswer: "[2,4]",
  },
  {
    id: 16,
    type: "closed",
    question: "myset = set([1, 2, 2, 3, 4, 4, 4]) print(myset)",
    code: "myset = set([1, 2, 2, 3, 4, 4, 4])\nprint(myset)",
    options: ["[1, 2, 2, 3, 4, 4, 4]", "{1,2,3,4}", "{[1,2,3,4]}", "none"],
    correctAnswer: "{1,2,3,4}",
  },
  {
    id: 17,
    type: "closed",
    question: "stuff = {'aaa': 111, 'bbb': 222, 'ccc': 333} print(stuff['bbb'])",
    code: "stuff = {'aaa': 111, 'bbb': 222, 'ccc': 333}\nprint(stuff['bbb'])",
    options: ["'222'", "[222]", "222", "Not found"],
    correctAnswer: "222",
  },
  {
    id: 18,
    type: "closed",
    question: "Yangi ro'yxat hosil qilish uchun:",
    options: ["a = dict()", "a = 0", "a = tuple()", "a = list()"],
    correctAnswer: "a = list()",
  },
  {
    id: 19,
    type: "closed",
    question: "p = 23 z = p if p == 22: z = z + 1 elif p == 23: p = p + 1 else: p = p + 2 print(z)",
    code: "p = 23\nz = p\nif p == 22:\n    z = z + 1\nelif p == 23:\n    p = p + 1\nelse:\n    p = p + 2\nprint(z)",
    options: ["23", "24", "22", "25"],
    correctAnswer: "23",
  },
  {
    id: 20,
    type: "closed",
    question: "To'g'ri yozilgan izoh qatori:",
    options: ["#izoh", "{izoh}", "//izoh", "<izoh>"],
    correctAnswer: "#izoh",
  },
  {
    id: 21,
    type: "closed",
    question: "Kortejni to'g'ri e'lon qilish:",
    options: ["t = ('kortej',)", "t = {'kortej'}", "t = 'kortej'", "t = ['kortej',]"],
    correctAnswer: "t = ('kortej',)",
  },
  {
    id: 22,
    type: "closed",
    question: "Elementni to'plamdan olib tashlaydigan, ammo xatolik chiqarmaydigan metod:",
    options: ["роро", "discard()", "delete()", "remove()"],
    correctAnswer: "discard()",
  },
  {
    id: 23,
    type: "closed",
    question: "numbers = [1, 2, 3, 4, 5, 6, 7] print(numbers[5:])",
    code: "numbers = [1, 2, 3, 4, 5, 6, 7]\nprint(numbers[5:])",
    options: ["error", "6,7", "[1,2,3,4,5]", "[6,7]"],
    correctAnswer: "[6,7]",
  },
  {
    id: 24,
    type: "closed",
    question: "Lug'atdagi elementlar sonini qaytaruvchi funksiya:",
    options: ["size()", "count()", "len()", "elements()"],
    correctAnswer: "len()",
  },
  {
    id: 25,
    type: "closed",
    question: "Ro'yxat oxiriga element qo'shadigan metod:",
    options: ["append()", ".add()", ".update()", ".increase()"],
    correctAnswer: "append()",
  },
  {
    id: 26,
    type: "closed",
    question: "z = (1, 2, 3, 4, 5, 6, 7, 8, 9) a = z[1::3]",
    code: "z = (1, 2, 3, 4, 5, 6, 7, 8, 9)\na = z[1::3]",
    options: ["2,5,8", "2,3,5", "2,4,6,8", "1,2,3"],
    correctAnswer: "2,5,8",
  },
  {
    id: 27,
    type: "closed",
    question: "p = 23 P = 0 if p > 10: print(p) else: print(11)",
    code: "p = 23\nP = 0\nif p > 10:\n    print(p)\nelse:\n    print(11)",
    options: ["23", "0", "11", "10"],
    correctAnswer: "23",
  },
  {
    id: 28,
    type: "closed",
    question: "Lug'at to'g'ri yozilgan qator:",
    options: [
      "dictionary = {kalit1:qiymat1, kalit2:qiymat2, ...}",
      "dictionary = | kalit1:qiymat1,kalit2:qiymat2, ...|",
      "dictionary = [ kalit1:qiymat1, kalit2:qiymat2, ....]",
      "dictionary = (kalit1:qiymat1, kalit2:qiymat2, ....)",
    ],
    correctAnswer: "dictionary = {kalit1:qiymat1, kalit2:qiymat2, ...}",
  },
  {
    id: 29,
    type: "closed",
    question: "Lug'atdagi qiymatlarni olish uchun funksiya:",
    options: ["values()", "value()", "keys()", "items()"],
    correctAnswer: "values()",
  },
  {
    id: 30,
    type: "closed",
    question: "Sonni 2 xona aniqlikda chiqarish uchun ishlatiladigan funksiya:",
    options: ["append()", "format()", "sum()", "max()"],
    correctAnswer: "format()",
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
