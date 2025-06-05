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
				{/* سوال */}
				<p className="text-lg md:text-4xl font-medium mb-12 lg:mb-20">
					{question.question}
				</p>

				{/* نوار پیشرفت */}
				<ProgressBar
					total={totalQuestions}
					correct={correctAnswersCount}
				/>
			</div>
			{/* گزینه‌های پاسخ */}
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
								'group flex items-center justify-between w-full text-left border rounded-lg px-4 py-2 transition font-medium',
								{
									// حالت‌های بدون ارسال
									'border-gray-300': !isSubmitted && !isSelected,
									'ring-2 ring-purple-500 border-purple-300':
										isSelected && !isSubmitted,

									// پاسخ صحیح
									' border-green-500': isSubmitted && isCorrect,

									// پاسخ غلط
									' border-red-500': isSubmitted && isWrong,
								},
							)}
						>
							<div className="flex items-center space-x-2">
								<span
									className={clsx(
										'w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold',
										{
											'bg-gray-400 group-hover:bg-primary-200 group-hover:text-primary-100':
												!isSubmitted && !isSelected,
											'bg-primary-100': isSelected && !isSubmitted,
											'bg-success': isSubmitted && isCorrect,
											'bg-error': isSubmitted && isWrong,
										},
									)}
								>
									{String.fromCharCode(65 + index)}
								</span>
								<span>{option}</span>
							</div>

							{/* آیکون‌ها */}
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
								className="mt-6 bg-primary-100 text-white p-4 rounded-md disabled:bg-primary-100/40 w-full text-lg md:text-[1.75rem] font-medium
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
							className="mt-6 bg-primary-100 text-white p-4 rounded-md w-full"
						>
							Next Question
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
