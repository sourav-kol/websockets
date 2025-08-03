import diff from 'fast-diff';
import { changeData } from '@/types';

export const diffFinder = (oldState: string, newState: string) => {
    const differences = diff(oldState, newState);

    let changes: changeData[] = [];

    let index = 0;
    for (const [op, data] of differences) {
        if (op === diff.EQUAL) {
            index += data.length;
        } else if (op === diff.INSERT) {
            changes.push({ op: "insert", from: index, to: 0, text: data });
            index += data.length;
        } else if (op === diff.DELETE) {
            changes.push({ op: "delete", from: index, to: data.length, text: "" });
            index += data.length;
        }
    }
    // setOldText(newState);
    return changes;
}
