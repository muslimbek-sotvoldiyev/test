"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState(null)

  useEffect(() => {
    // Get results from session storage
    const storedResults = sessionStorage.getItem("testResults")
    if (!storedResults) {
      router.push("/")
      return
    }

    setResults(JSON.parse(storedResults))
  }, [router])

  if (!results) {
    return <div className="container mx-auto px-4 py-12 text-center">Yuklanmoqda...</div>
  }

  // Calculate score for closed questions
  const totalQuestions = results.answers.length
  const correctAnswers = results.answers.filter((a) => a.answer === a.correctAnswer)
  const score = Math.round((correctAnswers.length / totalQuestions) * 100)

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Test yakunlandi!</CardTitle>
          <CardDescription>
            Rahmat, {results.userData.firstName} {results.userData.lastName}! Sizning natijalaringiz o'qituvchiga
            yuborildi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{score}%</div>
            <p className="text-gray-500">To'g'ri javoblar foizi</p>
            <p className="mt-2">
              {totalQuestions} ta savoldan {correctAnswers.length} tasiga to'g'ri javob berdingiz
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Test natijalari:</h3>
            <ul className="space-y-6">
              {results.answers.map((answer, index) => {
                // Find the original question to get the code
                const originalQuestion =
                  answer.questionId <= 30
                    ? { code: results.answers.find((a) => a.questionId === answer.questionId)?.code }
                    : { code: undefined }

                return (
                  <li key={index} className="border-b pb-4">
                    <p className="font-medium">
                      {index + 1}. {answer.question}
                    </p>
                    {originalQuestion.code && (
                      <div className="my-2">
                        <CodeBlock code={originalQuestion.code} />
                      </div>
                    )}
                    <div className="mt-2 flex flex-col gap-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Sizning javobingiz:</span> {answer.answer}
                      </p>
                      <p className={answer.answer === answer.correctAnswer ? "text-green-600" : "text-red-600"}>
                        <span className="font-medium">To'g'ri javob:</span> {answer.correctAnswer}
                      </p>
                      <p
                        className={
                          answer.answer === answer.correctAnswer
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }
                      >
                        {answer.answer === answer.correctAnswer ? "✓ To'g'ri" : "✗ Noto'g'ri"}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Bosh sahifaga qaytish</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
