import clsx from 'clsx'
import { CheckCircle, XCircle } from 'lucide-react'
import ProgressBar from './ProgressBar' // مسیر رو اگر متفاوت هست، تنظیم کن

export default function Question({
	question,
	selected,
	isSubmitted,
	onSelect,
	totalQuestions,
	correctAnswersCount,
	handleNext,
	handleSubmit,
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
								'flex items-center justify-between w-full text-left border rounded-lg px-4 py-2 transition font-medium',
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
											'bg-gray-400': !isSubmitted && !isSelected,
											'bg-purple-500': isSelected && !isSubmitted,
											'bg-green-500': isSubmitted && isCorrect,
											'bg-red-500': isSubmitted && isWrong,
										},
									)}
								>
									{String.fromCharCode(65 + index)}
								</span>
								<span>{option}</span>
							</div>

							{/* آیکون‌ها */}
							{showCheckIcon && (
								<CheckCircle className="w-5 h-5 text-green-500" />
							)}
							{showXIcon && (
								<XCircle className="w-5 h-5 text-red-500" />
							)}
						</button>
					)
				})}
				<div className="flex justify-end mt-4">
					{!isSubmitted ? (
						<button
							disabled={!selected}
							onClick={handleSubmit}
							className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md disabled:bg-indigo-300 w-full"
						>
							Submit
						</button>
					) : (
						<button
							onClick={handleNext}
							className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
						>
							Next Question
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
