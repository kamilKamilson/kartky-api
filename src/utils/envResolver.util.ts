import dotenv from "dotenv";
import path from "path";

const envResolver = () => {
    dotenv.config({ path: path.join(__dirname, "../.ENV") });
};

export default envResolver;
