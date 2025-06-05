'use client'

import data from '../data/data.json'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Question from '../components/Question'
import Header from '../components/Header'

export default function QuizPage() {
	const params = useParams()
	const router = useRouter()
	const topic = params.topic

	const quiz = data.quizzes.find(q => q.title.toLowerCase() === topic)

	const [current, setCurrent] = useState(0)
	const [selected, setSelected] = useState(null)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [score, setScore] = useState(0)
	const [progress, setProgress] = useState([])
	const [showError, setShowError] = useState(false)

	if (!quiz)
		return <div className="text-center mt-20">Quiz not found</div>

	const question = quiz.questions[current]
	const isLastQuestion = current === quiz.questions.length - 1

	const handleSubmit = () => {
		if (!selected) {
			setShowError(true)
			return
		}
		setIsSubmitted(true)
		setShowError(false)

		const isCorrect = selected === question.answer
		if (isCorrect) {
			setScore(prev => prev + 1)
		}
		setProgress(prev => [...prev, isCorrect])
	}

	const handleNext = () => {
		if (!isLastQuestion) {
			setCurrent(prev => prev + 1)
			setSelected(null)
			setIsSubmitted(false)
		}
	}

	const handleRestart = () => {
		router.push('/')
	}

	const handleSelect = option => {
		setSelected(option)
		setShowError(false)
	}

	return (
		<main className="min-h-screen flex flex-col items-start px-4 py-10 xl:px-12">
			<Header title={quiz.title} icon={quiz.icon} />
			<div className="w-full p-6 space-y-1">
				{!(isLastQuestion && isSubmitted) && (
					<p className="text-sm text-gray-600">
						Question {current + 1} of {quiz.questions.length}
					</p>
				)}
				{!isLastQuestion || !isSubmitted ? (
					<>
						<Question
							question={question}
							selected={selected}
							isSubmitted={isSubmitted}
							onSelect={handleSelect}
							totalQuestions={quiz.questions.length}
							correctAnswersCount={score}
							handleSubmit={handleSubmit}
							handleNext={handleNext}
							showError={showError}
						/>
					</>
				) : (
					<>
						<p className="text-xl font-semibold text-center">
							🎉 Your score is {score} out of {quiz.questions.length}
						</p>
						<div className="text-center">
							<button
								onClick={handleRestart}
								className="mt-6 bg-primary-100 text-white px-4 py-2 rounded-md w-full lg:w-1/2"
							>
								Play Again
							</button>
						</div>
					</>
				)}
			</div>
		</main>
	)
}
