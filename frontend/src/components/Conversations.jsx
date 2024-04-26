import useGetConversations from "../hooks/useGetConversations";
import { getRandomEmoji } from "../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();

    return (
        <div className='py-2 h-[70vh] w-full sm:w-auto flex flex-col overflow-auto'>
            {conversations.map((conversation, idx) => (
                <div key={conversation._id} className="w-full">
                    <Conversation
                        conversation={conversation}
                        emoji={getRandomEmoji()}
                        lastIdx={idx === conversations.length - 1}
                    />
                </div>
            ))}

            {loading && <span className='loading loading-spinner mx-auto'></span>}
        </div>
    );
};

export default Conversations;


// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;
