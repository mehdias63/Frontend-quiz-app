function Header({ title, icon }) {
	return (
		<div className="flex items-center space-x-2 mb-6">
			<img src={icon} alt={title} className="w-10 h-10" />
			<h2 className="text-2xl font-bold">{title}</h2>
		</div>
	)
}

export default Header
