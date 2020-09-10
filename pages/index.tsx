/** @format */
import { InferGetServerSidePropsType } from "next";
import "../styles/MainPage.scss";
import styled from "styled-components";
//Imported Components
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import InComing from "../components/Incoming";
import SortTab from "../components/SortTab";
import RepertuarCard from "../components/RepertuarCard";

const RepertuarSection = styled.div`
	margin: 0px;
	padding: 0px;
	width: 65%;
	box-shadow: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<Layout>
			<Slider />
			<SortTab />
			<RepertuarSection>
				{data.map((movie) => (
					<RepertuarCard key={movie._id} movie={movie} />
				))}
			</RepertuarSection>
		</Layout>
	);
}
export default Home;

type Seance = {
	hour: String;
	dimension: String;
	dubbing: String;
};

type Data = {
	title: String;
	genre: String;
	photo: String;
	duration: Number;
	released: Boolean;
	age: Number;
	description: String;
	city: [String];
	seance: Seance;
};

export const getServerSideProps = async (context) => {
	const res = await fetch("http://localhost:5000/Multikino/allMovies");
	const data: Data = await res.json();

	return {
		props: {
			data,
		},
	};
};
