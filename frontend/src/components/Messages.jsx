import { useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import MessageSkeleton from "./MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        if (messages.length > 0) {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            <div className='h-[75vh] sm:h-[auto]'>
                {!loading &&
                    messages.length > 0 &&
                    messages.map((message, index) => (
                        <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                            <Message message={message} />
                        </div>
                    ))}
                {loading &&
                    [...Array(3)].map((_, idx) => (
                        <div key={idx}>
                            <MessageSkeleton />
                        </div>
                    ))}
                {!loading && messages.length === 0 && (
                    <p className='text-center'>Send a message to start the conversation</p>
                )}
            </div>
        </div>
    );
};

export default Messages;


// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;
