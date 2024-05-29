export interface MessageBody {
	text: string;
	repliedTo?: { userId: string; username: string };
}

export interface IMessage {
	body: MessageBody;
	_id: string;
	owner: { _id: string; username: string, avatar: string; };
    createdAt: Date,
	replies: IMessage[];
	parent?: string;
}
