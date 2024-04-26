import { useState, useEffect } from "react";
import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";
import useResponsive from "../hooks/useResponsive";

const Home = () => {
	const { size } = useResponsive()
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			{size <= 425 ? <MessageContainer /> : <><Sidebar /> <MessageContainer /></>}
		</div>
	);
};
export default Home;
