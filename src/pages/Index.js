import React from 'react';
import '../index.css';
import Footer from './Footer';

const Home = () => {
	return (
		<div>
			<div class="container">
				<div id="header">
					<div class="header-text">
						<h1>Web Developer with a passion for <span class="colored-text">Computer Science</span> and <span class="colored-text">Literature</span></h1>
					</div>
				</div>
				<div class="row">
					<img src="/profilePicture.jpg" alt="Me"></img>
					<p class="colored-text">Hey, I'm Fynn Buesnel. I'm currently a student at <b>Boston University</b> persuing a major in <b>Computer Science</b>. I love fashion, volunteering, teaching, and currently web development utilizing React. Check out my experiences and projects!</p>
				</div>

			</div>
			<Footer />
		</div>
	);
};

export default Home;
