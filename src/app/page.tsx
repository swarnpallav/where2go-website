import { getRequest } from "@/utils/fetchRequest";
import HomepageClient from "./HomepageClient";

const Home = async () => {
	// const states = await getRequest("/state/getAllStates");
	const states = {
		data: [{ _id: "664736f06d128cdeffbffe44", name: "Uttar Pradesh" }],
	};
	return <HomepageClient states={states.data ?? []} />;
};

export default Home;
