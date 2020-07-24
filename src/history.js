// fk this
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true })

// this so f**king dumb idk why i need to refresh
export const pushHistory = (path) => {
    history.push(path);
    window.location.reload();
}
export default history;
