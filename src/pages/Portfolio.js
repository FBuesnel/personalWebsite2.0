import React from 'react';
import '../index.css';
import Footer from './Footer';
import graphing from '../images/3DGraphing.jpg';
import ibkeyword from '../images/IB-Keyword-Search.jpg'
import sfwbookclub from '../images/SFWBookclub.jpg'
import wordsearcher from '../images/wordSearcher.jpg'

const Portfolio = () => {
	return (
		<div className="p-20">
			<div className="experienceHeader"><b>Portfolio</b></div>
			<div className="text-xl pb-20 text-dark-grey">A variety of different projects I've made.</div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
				<a href="https://github.com/FBuesnel/wordSearcher" class="group w-full">
					<div class="flex relative h-full">
						<img alt="project" class="absolute inset-0 w-full h-full object-cover object-center rounded group-hover:brightness-0" src={sfwbookclub}></img>
						<div class="px-8 py-10 relative z-1 w-full border-4 border-gray-800 bg-gray-900 opacity-0 rounded hover:opacity-100 hover:brightness-100">
							<h2 class="tracking-widest text-sm title-font text-medium text-honey-400 mb-1 text-center">
								WebApp
							</h2>
							<h1 class="title-font text-lg text-medium text-white mb-3 text-center">
								Saint Francis Wood's Bookclub
							</h1>
							<p class="leading-relaxed text-center"> Created with the Google Books API and Flask, this webapp allows my community's bookclub to schedule meetings online and record their history. It has both a regular view and an admin login to edit information directly from the website.</p>
						</div>
					</div>
				</a>
				<a href="https://github.com/FBuesnel/wordSearcher" class="group w-full">
					<div class="flex relative h-full">
						<img alt="project" class="absolute inset-0 w-full h-full object-cover object-center rounded group-hover:brightness-0" src={graphing}></img>
						<div class="px-8 py-10 relative z-1 w-full border-4 border-gray-800 bg-gray-900 opacity-0 rounded hover:opacity-100 hover:brightness-100">
							<h2 class="tracking-widest text-sm title-font text-medium text-honey-400 mb-1 text-center">
								MatPlotLib
							</h2>
							<h1 class="title-font text-lg text-medium text-white mb-3 text-center">
								3D Graphing Experiment
							</h1>
							<p class="leading-relaxed text-center"> Python app employing Matplotlib and Numpy arrays to illustrate different matrices transformations. Allows a user to visualize the effects of rotation and translation on different 3D shapes.</p>
						</div>
					</div>
				</a>
				<a href="https://github.com/FBuesnel/wordSearcher" class="group w-full">
					<div class="flex relative h-full">
						<img alt="project" class="absolute inset-0 w-full h-full object-cover object-center rounded group-hover:brightness-0" src={wordsearcher}></img>
						<div class="px-8 py-10 relative z-1 w-full border-4 border-gray-800 bg-gray-900 opacity-0 rounded hover:opacity-100 hover:brightness-100">
							<h2 class="tracking-widest text-sm title-font text-medium text-honey-400 mb-1 text-center">
								Java
							</h2>
							<h1 class="title-font text-lg text-medium text-white mb-3 text-center">
								Word In Context Searcher
							</h1>
							<p class="leading-relaxed text-center"> Built with Java; Utilizing a custom-designed web scraper for word information. This allows a user to research a word in context, play a game to practice memorization and save it in a .txt file.</p>
						</div>
					</div>
				</a>
				<a href="https://github.com/FBuesnel/wordSearcher" class="group w-full">
					<div class="flex relative h-full">
						<img alt="project" class="absolute inset-0 w-full h-full object-cover object-center rounded group-hover:brightness-0" src={ibkeyword}></img>
						<div class="px-8 py-10 relative z-1 w-full border-4 border-gray-800 bg-gray-900 opacity-0 rounded hover:opacity-100 hover:brightness-100">
							<h2 class="tracking-widest text-sm title-font text-medium text-honey-400 mb-1 text-center">
								Java
							</h2>
							<h1 class="title-font text-lg text-medium text-white mb-3 text-center">
								IB-Keyword-Search
							</h1>
							<p class="leading-relaxed text-center"> Created in conjunction with other programmers from my High School. It allows a teacher to easily locate past test papers for use in class. Utilizes a PDF scanner and merge sort.</p>
						</div>
					</div>
				</a>
			</div>
			<Footer />
		</div>
	);
};

export default Portfolio;