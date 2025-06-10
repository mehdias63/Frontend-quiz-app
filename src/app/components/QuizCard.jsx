import Link from 'next/link'
import QuizIcon from './QuizIcon'

export default function QuizCard({ title, icon, bgColor }) {
	return (
		<Link href={`/${title.toLowerCase()}`}>
			<div className="bg-white shadow-md hover:shadow-lg transition p-4 rounded-xl cursor-pointer flex items-center w-full min-w-[20rem] xl:min-w-[35rem] mb-6 text-primary-900">
				<QuizIcon title={title} icon={icon} />
			</div>
		</Link>
	)
}
