import clsx from 'clsx'
import { CheckCircle, XCircle } from 'lucide-react'
import ProgressBar from './ProgressBar'

export default function Question({
	question,
	selected,
	isSubmitted,
	onSelect,
	totalQuestions,
	correctAnswersCount,
	handleNext,
	handleSubmit,
	showError,
}) {
	return (
		<div className="space-y-4 lg:flex lg:items-center justify-start lg:gap-x-20">
			<div className="lg:w-2/5 xl:w-1/2">
				<p className="text-lg md:text-4xl font-medium mb-12 lg:mb-20">
					{question.question}
				</p>
				<ProgressBar
					total={totalQuestions}
					correct={correctAnswersCount}
				/>
			</div>
			<div className="lg:w-3/5 xl:w-1/2 flex flex-col gap-y-4">
				{question.options.map((option, index) => {
					const isCorrect = option === question.answer
					const isSelected = selected === option
					const isWrong = isSubmitted && isSelected && !isCorrect
					const showCheckIcon = isSubmitted && isCorrect
					const showXIcon = isSubmitted && isWrong

					return (
						<button
							key={index}
							disabled={isSubmitted}
							onClick={() => onSelect(option)}
							className={clsx(
								'group flex items-center justify-between w-full text-left border rounded-3xl p-3 lg:p-4 transition font-medium bg-white',
								{
									'border-gray-300': !isSubmitted && !isSelected,
									'ring-2 ring-purple-500 border-purple-300':
										isSelected && !isSubmitted,
									' border-green-500': isSubmitted && isCorrect,
									' border-red-500': isSubmitted && isWrong,
								},
							)}
						>
							<div className="flex items-center space-x-2 lg:space-x-5 text-lg xl:text-[1.75rem]">
								<span
									className={clsx(
										' flex items-center justify-center rounded text-primary-800 p-2 font-bold',
										{
											'bg-primary-700 group-hover:bg-primary-200 group-hover:text-primary-100':
												!isSubmitted && !isSelected,
											'bg-primary-100 text-white':
												isSelected && !isSubmitted,
											'bg-success text-white':
												isSubmitted && isCorrect,
											'bg-error text-white': isSubmitted && isWrong,
										},
									)}
								>
									{String.fromCharCode(65 + index)}
								</span>
								<span className="text-primary-900">{option}</span>
							</div>

							{showCheckIcon && (
								<CheckCircle className="w-5 h-5 text-success" />
							)}
							{showXIcon && (
								<XCircle className="w-5 h-5 text-error" />
							)}
						</button>
					)
				})}
				<div className="flex flex-col mt-4">
					{!isSubmitted ? (
						<>
							<button
								onClick={handleSubmit}
								className="mt-6 bg-primary-100 text-white p-8 rounded-3xl w-full text-lg md:text-[1.75rem] font-medium
								leading-[1.125rem] md:leading-[1.75rem]"
							>
								Submit Answer
							</button>
							{!isSubmitted && showError && (
								<div className="flex items-center justify-center gap-x-2 mt-6">
									<XCircle className="w-5 h-5 text-error" />
									<p className="text-error text-lg text-center">
										Please select an answer
									</p>
								</div>
							)}
						</>
					) : (
						<button
							onClick={handleNext}
							className="mt-6 bg-primary-100 text-white p-8 rounded-3xl w-full text-lg md:text-[1.75rem] font-medium leading-[1.125rem] md:leading-[1.75rem]"
						>
							Next Question
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
