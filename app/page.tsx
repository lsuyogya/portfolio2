'use client';
import Image from 'next/image';
// import '@/styles/comingSoon.scss';
import { useEffect, useRef } from 'react';
import Wobbler from '@/components/Wobbler';

export default function Home() {
	// const all = document.querySelectorAll('.wobble');
	const wobRef = useRef<HTMLDivElement>(null);

	return (
		<main className='grid place-content-center min-h-screen'>
			{/* <div className=' text-9xl wobbleAnimation' ref={wobRef}>
				COMING SOON
			</div> */}
			<Wobbler txt='COMING SOON' />
		</main>
	);
}
