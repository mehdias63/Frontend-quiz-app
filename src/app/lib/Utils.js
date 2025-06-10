export function GetBgColor(title) {
	switch (title.toLowerCase()) {
		case 'html':
			return 'bg-primary-600'
		case 'css':
			return 'bg-primary-500'
		case 'javascript':
			return 'bg-primary-400'
		case 'accessibility':
			return 'bg-primary-200'
	}
}
