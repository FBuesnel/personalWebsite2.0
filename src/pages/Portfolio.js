import React from 'react';
import '../index.css';
import Footer from './Footer';

const Portfolio = () => {
	return (
		<div className="p-10">
			<div className="experienceHeader"><b>Portfolio</b></div>
			<div className="text-xl pb-10 text-dark-grey">A variety of different projects I've made.</div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 pb-20">
				<a href="https://sampom100.github.io/StockClustering/" className="w-full hover:opacity-100">
					<div className="flex relative h-full">
						<img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center rounded" src="https://sampom100.github.io/testPages/tiny/cluster.webp"></img>
						<div className="px-8 py-10 relative z-1 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-95 rounded">
							<h2 className="tracking-widest text-sm title-font text-medium text-honey-400 mb-1 text-center">
							WebApp
							</h2>
							<h1 className="title-font text-lg text-medium text-white mb-3 text-center">
							Saint Francis Wood's Bookclub
							</h1>
							<p className="leading-relaxed text-center"> Created with the Google Books API and Flask, this webapp allows my community's bookclub to schedule meetings online and record their history. It has both a regular view and an admin login to edit information direclty from the website.</p>
						</div>
					</div>
				</a>
			</div>
			<Footer />
		</div>
	);
};

export default Portfolio;