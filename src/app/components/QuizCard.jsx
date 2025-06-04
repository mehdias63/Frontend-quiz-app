import Link from 'next/link'

export default function QuizCard({ title, icon }) {
	return (
		<Link href={`/${title.toLowerCase()}`}>
			<div className="bg-white shadow-md hover:shadow-lg transition p-4 rounded-xl cursor-pointer flex items-center gap-4 w-full min-w-[20rem] xl:min-w-[35rem] mb-6 text-primary-900">
				<img
					src={icon.replace('./', '/')}
					alt={title}
					className="w-6 h-6"
				/>
				<span className="text-lg font-semibold">{title}</span>
			</div>
		</Link>
	)
}
