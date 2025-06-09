// import { Button } from '../../components/components/ui/button'

function Header({ title, icon, bgColor }) {
	return (
		<div className="flex items-center space-x-2 mb-6">
			<div className={bgColor}>
				<img src={icon} alt={title} className="w-10 h-10" />
			</div>
			<h2 className="text-2xl font-bold">{title}</h2>
			{/* <Button variant="outline">Button</Button> */}
		</div>
	)
}

export default Header
