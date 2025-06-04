import clsx from 'clsx'
import ProgressBar from './ProgressBar' // مسیر رو اگر متفاوت هست، تنظیم کن

export default function Question({
	question,
	selected,
	isSubmitted,
	onSelect,
	totalQuestions,
	correctAnswersCount,
}) {
	return (
		<div className="space-y-4 lg:flex lg:items-center justify-center lg:gap-x-20">
			<div className="lg:w-1/2">
				{/* سوال */}
				<p className="text-lg md:text-4xl font-medium mb-12 lg:mb-36">
					{question.question}
				</p>

				{/* نوار پیشرفت */}
				<ProgressBar
					total={totalQuestions}
					correct={correctAnswersCount}
				/>
			</div>
			{/* گزینه‌های پاسخ */}
			<div className="lg:w-1/2 flex flex-col gap-y-4">
				{question.options.map((option, index) => {
					const isCorrect = option === question.answer
					const isWrong = selected === option && !isCorrect
					const isSelected = selected === option

					return (
						<button
							key={index}
							disabled={isSubmitted}
							onClick={() => onSelect(option)}
							className={clsx(
								'flex items-center w-full text-left border rounded-lg p-4 transition text-lg md:text-2xl gap-x-4 bg-white',
								{
									'border-gray-300':
										!isSubmitted || selected !== option,
									'bg-green-100 border-green-500':
										isSubmitted && isCorrect,
									'bg-red-100 border-red-500': isSubmitted && isWrong,
									'ring-2 ring-indigo-500':
										selected === option && !isSubmitted,
								},
							)}
						>
							<span
								className={clsx(
									'w-14 h-14 mr-3 flex items-center justify-center text-lg lg:text-[1.75rem] font-medium rounded-md',
									{
										'bg-gray-300 text-black':
											!isSubmitted && !isSelected,
										'bg-purple-600 text-white':
											isSelected && !isSubmitted,
										'bg-green-600 text-white':
											isSubmitted && isCorrect,
										'bg-red-600 text-white': isSubmitted && isWrong,
									},
								)}
							>
								{String.fromCharCode(65 + index)}
							</span>
							{option}
						</button>
					)
				})}
			</div>
		</div>
	)
}
