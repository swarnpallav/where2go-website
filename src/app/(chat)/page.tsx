import { getRequest } from "@/utils/apiRequest";
import HomepageClient from "../HomepageClient";

const Home = async () => {
	const [error, states] = await getRequest("/state/getAllStates");

	if (error) {
		throw new Error(error?.message);
	}
	return <HomepageClient states={states.data ?? []} />;
};

export default Home;
