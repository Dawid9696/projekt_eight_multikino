/** @format */

import Link from "next/link";
import { Fragment } from "react";
import "../styles/RepertuarCards.scss";

interface Props {
	movie: any;
}

export default function RepertuarCard(props: Props) {
	console.log(props);
	return (
		<section className='RepertuarCard'>
			<div className='RepertuarCard-Photo'>
				<Link href='/movie/[DetailPage]' as={`/movie/${props.movie._id}`}>
					<img className='RepertuarCard-Photo-Img' src={props.movie.photo} />
				</Link>
			</div>

			<div className='RepertuarCard-Info'>
				<Link href='/movie/[DetailPage]' as={`/movie/${props.movie._id}`}>
					<div className='RepertuarCard-Info-Title'>{props.movie.title}</div>
				</Link>
				<div className='RepertuarCard-Infos'>
					<div className='RepertuarCard-Info-Genre'>{props.movie.genre}</div>
					<div className='RepertuarCard-Info-Age'>Od {props.movie.age} lat</div>
					<div className='RepertuarCard-Info-Duration'>{props.movie.duration} minut</div>
				</div>
				<div className='RepertuarCard-Info-Description'>{props.movie.description}</div>
				<div className='RepertuarCard-Info-Seances'>
					{props.movie.seance.map((item) => {
						return (
							<div className='RepertuarCard-Info-Seances-Card'>
								<div>{item.hour}</div>
								<div className='RepertuarCard-Info-Seances-Card-Info'>
									<div>{item.dimension}</div>
									<div>{item.dubbing}</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className='RepertuarCard-Ratio'></div>
		</section>
	);
}
