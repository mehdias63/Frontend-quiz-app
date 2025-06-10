import { GetBgColor } from 'app/lib/Utils'
import clsx from 'clsx'

function QuizIcon({ icon, title }) {
	const bgColorClass = GetBgColor(title)
	return (
		<div className="flex items-center justify-center space-x-4">
			<div className={clsx('rounded-lg', bgColorClass)}>
				<img src={icon} alt={title} className="w-14 h-14 p-2" />
			</div>
			<h2 className="text-2xl font-bold text-primary-900">{title}</h2>
		</div>
	)
}

export default QuizIcon
