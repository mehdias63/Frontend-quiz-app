// import { Button } from '../../components/components/ui/button'

import QuizIcon from './QuizIcon'

function Header({ title, icon, bgColor }) {
	return (
		<div className="lg:px-12">
			<QuizIcon title={title} icon={icon} bgColor={bgColor} />
			{/* <Button variant="outline">Button</Button> */}
		</div>
	)
}

export default Header
