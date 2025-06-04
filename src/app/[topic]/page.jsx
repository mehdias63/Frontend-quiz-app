'use client'

import data from '../data/data.json'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Question from '../components/Question'

export default function QuizPage() {
	const params = useParams()
	const router = useRouter()
	const topic = params.topic

	const quiz = data.quizzes.find(q => q.title.toLowerCase() === topic)

	const [current, setCurrent] = useState(0)
	const [selected, setSelected] = useState(null)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [score, setScore] = useState(0)
	const [progress, setProgress] = useState([]) // هر سوال: true (درست) یا false (غلط)

	if (!quiz)
		return <div className="text-center mt-20">Quiz not found</div>

	const question = quiz.questions[current]
	const isLastQuestion = current === quiz.questions.length - 1

	const handleSubmit = () => {
		setIsSubmitted(true)
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

	return (
		<main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 xl:px-40">
			<div className="flex items-center space-x-2 mb-6">
				<img src={quiz.icon} alt={quiz.title} className="w-10 h-10" />
				<h2 className="text-2xl font-bold">{quiz.title}</h2>
			</div>
			{!(isLastQuestion && isSubmitted) && (
				<p className="text-sm text-gray-600">
					Question {current + 1} of {quiz.questions.length}
				</p>
			)}
			<div className="w-full p-6 space-y-4">
				{!isLastQuestion || !isSubmitted ? (
					<>
						<Question
							question={question}
							selected={selected}
							isSubmitted={isSubmitted}
							onSelect={setSelected}
							totalQuestions={quiz.questions.length}
							correctAnswersCount={score}
						/>
						<div className="flex justify-end mt-4">
							{!isSubmitted ? (
								<button
									disabled={!selected}
									onClick={handleSubmit}
									className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:bg-indigo-300 w-full lg:w-1/2"
								>
									Submit
								</button>
							) : (
								<button
									onClick={handleNext}
									className="bg-indigo-600 text-white px-4 py-2 rounded-md"
								>
									Next Question
								</button>
							)}
						</div>
					</>
				) : (
					<>
						<p className="text-xl font-semibold text-center">
							🎉 Your score is {score} out of {quiz.questions.length}
						</p>
						<div className="text-center">
							<button
								onClick={handleRestart}
								className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
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
