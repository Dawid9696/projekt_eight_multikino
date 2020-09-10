/** @format */

import Head from "next/head";
import styled from "styled-components";

const LayoutSection = styled.div`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: white;
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
	background-color: black;
`;
//Imported Components
import Navbar from "./Navbar";

export default function Layout({ children }) {
	return (
		<LayoutSection>
			<Navbar />
			{children}
		</LayoutSection>
	);
}
