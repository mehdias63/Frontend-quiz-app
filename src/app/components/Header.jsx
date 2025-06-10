// import { Button } from '../../components/components/ui/button'

import QuizIcon from './QuizIcon'

function Header({ title, icon, bgColor }) {
	return (
		<div>
			<QuizIcon title={title} icon={icon} bgColor={bgColor} />
			{/* <Button variant="outline">Button</Button> */}
		</div>
	)
}

export default Header
