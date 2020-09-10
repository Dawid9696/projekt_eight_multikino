/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const slideImages = [
	"https://img.grouponcdn.com/deal/btEqHhsoEM9S383bLDR7W9U4s5o/bt-960x576/v1/c700x420.jpg",
	"https://cdn.nowiny.pl/im/v1/news-900-widen-wm/2019/12/02/158161_1575291732_92808800.jpg",
	"https://static.antyweb.pl/uploads/2013/05/multikino-1420x670.jpg",
];

const Slideshow = () => {
	const [opacity0, setOpacity0] = useState(1);
	const [opacity1, setOpacity1] = useState(0);
	const [opacity2, setOpacity2] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeout(() => {
				setOpacity0(0);
				setOpacity1(1);
			}, 0);
			setTimeout(() => {
				setOpacity1(0);
				setOpacity2(1);
			}, 5000);
			setTimeout(() => {
				setOpacity2(0);
				setOpacity0(1);
			}, 10000);
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	});

	return (
		<Slider>
			<EachSlide>
				<Slide opacity={opacity0} slide={slideImages[0]}></Slide>
				<Slide opacity={opacity1} slide={slideImages[1]}></Slide>
				<Slide opacity={opacity2} slide={slideImages[2]}></Slide>
			</EachSlide>
		</Slider>
	);
};

export default Slideshow;

const Slider = styled.div`
	margin: 0px;
	padding: 0px;
	width: 70%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const EachSlide = styled.div`
	position: relative;
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 650px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;

	transition: 1s;
`;

const Slide = styled.div`
	position: absolute;
	opacity: ${(props) => props.opacity};
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 650px;
	background-image: url(${(props) => props.slide});
	background-repeat: no-repeat;
	background-size: cover;
	box-sizing: border-box;
	transition: 1s;
`;
