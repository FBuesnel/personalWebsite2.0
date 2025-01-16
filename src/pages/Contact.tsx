import React from 'react';

import { Container, Header } from '../styles/GlobalStyles';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
	min-height: 80vh;
`;


const Contact = () => {
	return (
		<StyledContainer>
			<Header>Contact Me</Header>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="contact-left">
						<p className="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send mr-2" viewBox="0 0 16 16">
								<path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
							</svg>
							fynnbuesnel@gmail.com
						</p>
						<p className="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-telephone mr-2" viewBox="0 0 16 16">
								<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.450 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.580-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.460-1.657l.548-2.19a.678.678 0 0 0-.122-.580L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.740.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
							</svg>
							+1-415-629-0145
						</p>
					</div>
					<div className="contact-right">
						<form method="POST" action="https://script.google.com/macros/s/AKfycbyq-E7WOFMmrPK13YxiN2wztnVvg8rhRhVYy6B7e-BcNgDQ8Bbk74IoP_PS0yfO5E2law/exec" id="myForm">
							<input type="text" name="name" placeholder="Your Name" required className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-honey-500"></input>
							<input type="email" name="email" placeholder="Your Email" required className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-honey-500"></input>
							<textarea name="message" placeholder="Your Message" className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-honey-500"></textarea>
							<button type="submit" className="bg-honey text-white py-2 px-4 rounded hover:bg-honey-600 focus:outline-none">Submit</button>
						</form>
						<span id="msg"></span>
					</div>
				</div>
		</StyledContainer>
	);
};

export default Contact;
