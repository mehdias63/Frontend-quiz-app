import data from './data/data.json'
import QuizCard from './components/QuizCard'

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 bg-gray-50 lg:gap-x-20 text-primary-900 leading-[2.5rem] lg:leading-[4rem]">
			<div className="flex flex-col pb-8 lg:pb-32 gap-y-8">
				<h1 className="text-[2.5rem] lg:text-[4rem] font-light mb-2">
					Welcome to the
					<span className="block font-medium">Frontend Quiz!</span>
				</h1>
				<p className="lg:text-lg text-primary-800 mb-6">
					Pick a subject to get started.
				</p>
			</div>
			<div className="">
				{data.quizzes.map(quiz => (
					<QuizCard
						key={quiz.title}
						title={quiz.title}
						icon={quiz.icon}
					/>
				))}
			</div>
		</main>
	)
}
