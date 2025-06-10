export default function ProgressBar({ total, answered }) {
	const percent = (answered / total) * 100

	return (
		<div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
			<div
				className="h-full bg-primary-100 transition-all duration-300"
				style={{ width: `${percent}%` }}
			/>
		</div>
	)
}
