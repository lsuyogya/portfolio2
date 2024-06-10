'use client';
import Image from 'next/image';
// import '@/styles/comingSoon.scss';
import { Rubik_Moonrocks } from 'next/font/google';
import localFont from 'next/font/local';
import { motion } from 'framer-motion';

const pixel = Rubik_Moonrocks({ weight: '400', subsets: ['latin'] });
const pixelify = localFont({
	src: '../public/fonts/pixelify_sans/PixelifySans-VariableFont_wght.ttf',
});
export default function Home() {
	return (
		<main className='grid place-content-center min-h-screen'>
			<div className={`text-9xl ${pixel.className} `}>WELCOME</div>
			<div className={`text-2xl ${pixelify.className} text-center `}>
				Scroll down to know more about me
			</div>
			<motion.div
				animate={{ y: [0, 20, 0] }}
				transition={{ repeat: Infinity, duration: 2 }}>
				<Image
					src={'/scroll-down-arrow.svg'}
					alt='scroll arrow'
					width={100}
					height={100}
					className='m-auto mt-4'></Image>
			</motion.div>
		</main>
	);
}
