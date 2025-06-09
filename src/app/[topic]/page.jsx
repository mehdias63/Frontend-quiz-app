'use client'

import data from '../data/data.json'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Question from '../components/Question'
import Header from '../components/Header'
import clsx from 'clsx'

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

	const bgColor = clsx('rounded-full p-2', {
		'bg-orange-200': quiz.title.toLowerCase() === 'html',
		'bg-blue-200': quiz.title.toLowerCase() === 'css',
		'bg-yellow-200': quiz.title.toLowerCase() === 'javascript',
		'bg-purple-200': quiz.title.toLowerCase() === 'accessibility',
	})

	return (
		<main className="relative min-h-screen flex flex-col items-start px-4 py-10 xl:px-12 z-20">
			<Header title={quiz.title} icon={quiz.icon} bgColor={bgColor} />
			<div className="w-full p-6 space-y-1">
				{!(isLastQuestion && isSubmitted) && (
					<p className="text-sm lg:text-lg leading-[1.3125rem] text-primary-800">
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
					<div className="w-full flex items-center">
						<div className="w-full">
							<h2>Quiz completed</h2>
							<p>You scored...</p>
						</div>
						<div className="w-full">
							<div className="bg-white w-full p-4 flex flex-col items-center">
								<div className="flex items-center space-x-2 mb-6">
									<div className={bgColor}>
										<img
											src={quiz.icon}
											alt={quiz.title}
											className="w-10 h-10"
										/>
									</div>
									<h2 className="text-2xl font-bold">{quiz.title}</h2>
								</div>
								<p className="text-[5rem]">{score}</p>
								<span> out of {quiz.questions.length}</span>
							</div>
							<div className="text-center w-full">
								<button
									onClick={handleRestart}
									className="mt-6 bg-primary-100 text-white px-4 py-2 rounded-md w-full lg:w-1/2"
								>
									Play Again
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}
