import { getRequest } from "@/utils/apiRequest";
import HomepageClient from "./HomepageClient";

const Home = async () => {
	// const [error, states] = await getRequest("/state/getAllStates");
	const states = {
		data: [{ _id: "664736f06d128cdeffbffe44", name: "Uttar Pradesh" }],
	};
	return <HomepageClient states={states.data ?? []} />;
};

export default Home;
