import React from 'react';
import '../index.css';
import joejuice from '../images/joejuice.png'
import conventlogo from '../images/conventlogo.png'

import { Container, Header } from '../styles/GlobalStyles';

const Experience = () => {
	return (
		<Container>
			<Header>Experience</Header>
			<div className="text-xl pb-10 text-dark-grey">Previous jobs experiences and my Education.</div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
				<div className="rounded-lg shadow-md border-4 border-grey">
					<div className="p-4">
						<div className="flex items-center">
							<img className="rounded-full mr-3" alt="Joe & The Juice" src={joejuice} width="50" height="50"></img>
							<div className="text-center">
								<h5 className="text-lg font-bold">Juicer</h5>
								<p className="text-gray-600">Joe & The Juice (2023)</p>
							</div>
						</div>
						<p className="mt-4">
							<ul className="list-disc ml-6">
								<li>Handled hundreds of customer orders every day, making juices, sandwiches, and shakes while creating a good atmosphere in the store.</li>
								<li>Balanced work responsibilities and pursued my passion for programming during the summer.</li>
								<li>Transitioned from a previous technology job to the fast-paced environment of Joe and the Juice, demonstrating adaptability in learning new skills.</li>
							</ul>
						</p>
					</div>
				</div>
				<div className="rounded-lg shadow-md border-4 border-grey">
					<div className="p-4">
						<div className="flex items-center">
							<img className="rounded-full mr-3" alt="Convent & Stuart Hall" src={conventlogo} width="50" height="50"></img>
							<div className="text-center">
								<h5 className="text-lg font-bold">Technology Assistant</h5>
								<p className="text-gray-600">Convent & Stuart Hall (2022)</p>
							</div>
						</div>
						<p className="mt-4">
							<ul className="list-disc ml-6">
								<li>Facilitated faculty device transfers by moving their data and preparing their new computers.</li>
								<li>Set up new devices across campus like TVs in every classroom.</li>
								<li>Organized an e-recycling program for the school's students and administration.</li>
							</ul>
						</p>
					</div>
				</div>
				<div className="rounded-lg shadow-md border-4 border-grey">
					<div className="p-4">
						<div className="flex items-center">
							<img className="rounded-full mr-3" alt="Convent & Stuart Hall" src={conventlogo} width="50" height="50"></img>
							<div className="text-center">
								<h5 className="text-lg font-bold">Technology Intern</h5>
								<p className="text-gray-600">Convent & Stuart Hall (2021)</p>
							</div>
						</div>
						<p className="mt-4">
							<ul className="list-disc ml-6">
								<li>Facilitated faculty device transfers by moving their data and preparing their new computers.</li>
								<li>Set up new devices across campus like TVs in every classroom.</li>
								<li>Organized an e-recycling program for the school's students and administration.</li>
							</ul>
						</p>
					</div>
				</div>
			</div>
			<div className="experienceHeader"><b>Education</b></div>
			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
				<div className="rounded-lg shadow-md border-4 border-gray-300">
					<div className="p-4">
						<div className="flex items-center">
							<img className="rounded-full mr-3" alt="Boston University" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Boston_University_seal.svg/1920px-Boston_University_seal.svg.png" width="50" height="50"></img>
							<div className="text-center">
								<h5 className="text-lg font-bold">Boston University</h5>
								<p className="text-gray-600">2023-2027</p>
							</div>
						</div>
						<p className="mt-4">
							<ul className="list-disc ml-6">
								<li>Degree: Bachelor's of Arts in Computer Science</li>
								<li>Activities and Societies: SPARK</li>
								<li>Classes: CS 131 Combinatoric Structures, CS 132 Geometric Algorithms</li>
							</ul>
						</p>
					</div>
				</div>
				<div className="rounded-lg shadow-md border-4 border-gray-300">
					<div className="p-4">
						<div className="flex items-center">
							<img className="rounded-full mr-3" alt="Convent & Stuart Hall" src={conventlogo} width="50" height="50"></img>
							<div className="text-center">
								<h5 className="text-lg font-bold">Convent & Stuart Hall High School</h5>
								<p className="text-gray-600">2019-2023</p>
							</div>
						</div>
						<p className="mt-4">
							<ul className="list-disc ml-6">
								<li>Grades/Scores: 4.0/4.70 UW/W GPA, 35 ACT</li>
								<li>Degree: International Baccalaureate Diploma, High School Diploma, 4.0/4.70 UW/W GPA, 35 ACT</li>
								<li>Awards: Valedictorian, Faculty Designated Awards (Math, History, Modern & Classical Languages, English), 4-Year Prizes (Math, English)</li>
								<li>Activities and Societies: Varsity Volleyball, Co-Founder Garden Club, Founder Social Justice Literary Club, Software Engineer for IB-Keyword-Search, Poetry Festival Panelist, Study Abroad Programs (Berlin, Copenhagen, and Rome)</li>
							</ul>
						</p>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Experience;
