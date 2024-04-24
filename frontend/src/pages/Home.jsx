import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";

const Home = () => {
	
	const viewportWidth = window.innerWidth; // Viewport width in pixels
	const viewportHeight = window.innerHeight; // Viewport height in pixels

	console.log("Viewport width: " + viewportWidth + "px");
	console.log("Viewport height: " + viewportHeight + "px");

	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			{viewportWidth <=390 ? <MessageContainer /> : <><Sidebar /> <MessageContainer /></>}
		</div>
	);
};
export default Home;
