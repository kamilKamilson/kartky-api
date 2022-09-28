import envResolver from "./envResolver.util";

envResolver();

const url = (path: string) => {
    return process.env.DEFAULT_DOMAIN + path;
};

export default url;
