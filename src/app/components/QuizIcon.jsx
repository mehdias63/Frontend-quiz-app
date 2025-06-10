function QuizIcon({ icon, title, bgColor }) {
	return (
		<div className="flex items-center justify-center space-x-2">
			<div className={bgColor}>
				<img src={icon} alt={title} className="w-10 h-10" />
			</div>
			<h2 className="text-2xl font-bold">{title}</h2>
		</div>
	)
}

export default QuizIcon
