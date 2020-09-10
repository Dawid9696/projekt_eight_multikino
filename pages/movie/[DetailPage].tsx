/** @format */
import { InferGetServerSidePropsType } from "next";

export default function DetailPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	console.log(data);
	return (
		<section>
			<div>
				<img src={data.photo} />
			</div>
			<div></div>
			<div></div>
		</section>
	);
}

type Seance = {
	hour: string;
	dimension: string;
	dubbing: string;
};

type Data = {
	title: string;
	genre: string;
	photo: string;
	duration: Number;
	released: Boolean;
	age: Number;
	direction: string;
	description: string;
	city: [string];
	seance: Seance;
	comments: any;
};

export const getServerSideProps = async (context) => {
	const res = await fetch(`http://localhost:5000/Multikino/movie/${context.params.DetailPage}`);
	const data: Data = await res.json();
	return {
		props: {
			data,
		},
	};
};
