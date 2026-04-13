import { useStopwatch } from "./useStopwatch";

export const Keyboard = () => {

    const { lap } = useStopwatch();

    const handleFirst = (event: KeyboardEvent) => {
        if (event.key === "1") {
            lap();
        };
    }
}