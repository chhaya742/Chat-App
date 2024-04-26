import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { FaSquarePlus } from "react-icons/fa6";
import { useAuthContext } from "../context/AuthContext";
import Conversations from "./Conversations";
import { FaArrowRight } from "react-icons/fa";
import Sidebar from "./Sidebar";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [isOpen, setIsOpen] = useState(false);
	const viewportWidth = window.innerWidth;
	const toggleList = () => {
		setIsOpen(!isOpen);
	};
	console.log(selectedConversation)
	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	useEffect(() => {
		viewportWidth <= 430 && setIsOpen(!isOpen);
	}, [selectedConversation]);

	return (
		<div className='md:min-w-[450px] w-[50vh] flex flex-col'>
			{!selectedConversation ? (
				viewportWidth > 430 && <NoChatSelected />
			) : !isOpen && (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<div className="d flex justify-between">
							<span className='label-text'>To:</span>{" "}
							{viewportWidth <= 430 && <><button onClick={toggleList}><FaArrowRight /></button>
							</>
							}
						</div>
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)
			}
			{isOpen && <Sidebar />}

		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	const viewportWidth = window.innerWidth;
	const [isOpen, setIsOpen] = useState(false);

	const toggleList = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='flex items-center justify-center w-full h-full p-4'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				{!isOpen && <div>
					<p>Welcome 👋 {authUser.fullName} ❄</p>
					<p>Select a chat to start messaging</p>
					<TiMessages className='text-3xl md:text-6xl text-center' />
					{viewportWidth <= 430 && <> <button style={{
						position: "relative",
						left: "101px"
					}} onClick={toggleList}><FaSquarePlus /></button>
					</>
					}
				</div>}
				{isOpen && <Sidebar />}
			</div>
		</div>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;
