import { X } from "lucide-react";

interface RepyingToProps {
	replyingTo: {
		_id: string;
		username: string;
	};
	onClose: () => void;
}

const ReplyingTo: React.FC<RepyingToProps> = ({ replyingTo, onClose }) => {
	return (
		<div className="text-xs p-2 flex justify-between items-center">
			<div>replying to: @{replyingTo.username}</div>
			<X onClick={onClose} className="w-3 h-3 cursor-pointer" />
		</div>
	);
};

export default ReplyingTo;
