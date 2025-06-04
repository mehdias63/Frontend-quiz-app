export default function ProgressBar({ total, correct }) {
	const percent = (correct / total) * 100

	return (
		<div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
			<div
				className="h-full bg-purple-500 transition-all duration-300"
				style={{ width: `${percent}%` }}
			/>
		</div>
	)
}
