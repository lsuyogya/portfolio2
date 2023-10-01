'use client';
import React from 'react';
import '@/styles/comingSoon.scss';
import { useRef } from 'react';

const Wobbler = ({ txt }: { txt: string }) => {
	const wobRef = useRef<HTMLDivElement>(null);
	const textArray = txt.split('');
	console.log(textArray);

	return (
		<div className='text-9xl' ref={wobRef}>
			{textArray.map((x, idx) => {
				let delay = (idx + 1) * 50;
				return (
					<span
						className='wobbleAnimation'
						style={{ animationDelay: `${delay}ms` }}
						key={x + idx}>
						{x}
					</span>
				);
			})}
		</div>
	);
};

export default Wobbler;
