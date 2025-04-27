import { change } from "@/types";
import { next as Automerge } from "@automerge/automerge"

export function AutomergeTest() {
    let doc = Automerge.from({ text: "hello world" });

    console.log("Initial document:", doc.text) // "hello world"

    // Fork the doc and make a change
    let forkedByUser1 = Automerge.clone(doc)
    forkedByUser1 = Automerge.change(forkedByUser1, d => {
        Automerge.splice(d, ["text"], 5, 0, " wonderful")
    })

    console.log("user A sees before merge: ", forkedByUser1.text) // "hello wonderful world"

    let forkedByUser2 = Automerge.clone(doc)
    forkedByUser2 = Automerge.change(forkedByUser2, d => {
        // Automerge.splice(d, ["text"], 3, 3, " Greetings")
        Automerge.updateText(d, ["text"], " new text inserted...")
    })

    console.log("user B sees before merge: ", forkedByUser2.text) // "hello wonderful world"

    // const changesA = Automerge.getChanges(Automerge.init(), forkedByUser1)
    // const changesB = Automerge.getChanges(Automerge.init(), forkedByUser2)

    // let finalDocA = Automerge.applyChanges(Automerge.init(), [...changesA, ...changesB])
    // let finalDocB = Automerge.applyChanges(Automerge.init(), [...changesB, ...changesA])

    // var x = Automerge.block(finalDocA[0], [], 3);
    // console.log("x", x);
    // Automerge.updateText(finalDocA[0], ["text"], " new text inserted...");

    let finalDocA = Automerge.merge(forkedByUser1, forkedByUser2);

    //@ts-ignore
    console.log("After merge, User A sees:", finalDocA[0].text)
    //@ts-ignore
    // console.log("After merge, User B sees:", finalDocB[0].text)

    //output: 
    // Initial document: hello world
    // index.ts:14 user A sees before merge:  hello wonderful world
    // index.ts:21 user B sees before merge:  hel Greetingsworld
    // index.ts:30 After merge, User A sees: hel Greetings wonderfulworld
    // index.ts:32 After merge, User B sees: hel Greetings wonderfulworld

}

export function MergeChanges(text: string, change: change): string {
    let localChange = Automerge.from({ text });

    let replica = Automerge.clone(localChange)
    let remoteChange = Automerge.change(replica, d => {
        Automerge.splice(d, ["text"], change.insertAt, change.deleteAt, change.text)

    });

    console.log("text remote ", remoteChange.text);

    localChange = Automerge.merge(localChange, remoteChange);
    // var x = Automerge.applyChanges(localChange, Automerge.getChanges(localChange, replica));
    console.log("text after merge", localChange.text);

    return localChange.text as string;
}