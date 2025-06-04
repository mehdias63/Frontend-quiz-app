import LocalFont from 'next/font/local'

const rubikFont = LocalFont({
	src: [
		{
			path: '../../public/fonts/static/Rubik-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/static/Rubik-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/static/Rubik-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-rubik',
	style: 'normal',
	display: 'block',
})

export default rubikFont
