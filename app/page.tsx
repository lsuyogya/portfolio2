'use client';
import Image from 'next/image';
// import '@/styles/comingSoon.scss';
import { useEffect, useRef } from 'react';
import Wobbler from '@/components/Wobbler';

export default function Home() {
	// const all = document.querySelectorAll('.wobble');
	const wobRef = useRef<HTMLDivElement>(null);
	useEffect(() => {}, []);
	// // Iterate through each "wobble"
	// all.forEach((el) => {
	// 	// Get the text content of the element
	// 	let text = el.textContent as string;
	// 	// Create an array of separate letters
	// 	let textArray = text.split('');
	// 	// Iterate through each letter and give it its own span element and individual animation delay offset
	// 	const textCode = textArray.map((x, idx) => {
	// 		let delay = (idx + 1) * 50;
	// 		return `<span style="animation-delay: ${delay}ms">${x}</span>`;
	// 	});
	// 	// replace the element's html with our dynamically created html
	// 	el.innerHTML = textCode.join('');
	// });

	return (
		<main className='grid place-content-center min-h-screen'>
			{/* <div className=' text-9xl wobbleAnimation' ref={wobRef}>
				COMING SOON
			</div> */}
			<Wobbler txt='COMING SOON' />
		</main>
	);
}
