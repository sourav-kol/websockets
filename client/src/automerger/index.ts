import { changeData } from "@/types";
import { next as Automerge, change } from "@automerge/automerge"

export function AutomergeTest() {
    let doc = Automerge.from({ text: "hello world" });

    console.log("Initial document:", doc.text) // "hello world"

    // Fork the doc and make a change
    let forkedByUser1 = Automerge.clone(doc)
    forkedByUser1 = Automerge.change(forkedByUser1, d => {
        Automerge.splice(d, ["text"], 6, 1, "")
    })

    console.log("user A sees before merge: ", forkedByUser1.text) // "hello wonderful world"

    let forkedByUser2 = Automerge.clone(doc)
    forkedByUser2 = Automerge.change(forkedByUser2, d => {
        Automerge.splice(d, ["text"], 6, 1, "x")
        // Automerge.updateText(d, ["text"], " new text inserted...")
    })


    console.log("user B sees before merge: ", forkedByUser2.text) // "hello wonderful world"

    const changesA = Automerge.getChanges(Automerge.init(), forkedByUser1)
    const changesB = Automerge.getChanges(Automerge.init(), forkedByUser2)

    console.log("changesA", changesA);

    let finalDocA = Automerge.applyChanges(Automerge.init(), [...changesA, ...changesB])
    let finalDocB = Automerge.applyChanges(Automerge.init(), [...changesB, ...changesA])

    // var x = Automerge.block(finalDocA[0], [], 3);
    // console.log("x", x);
    // Automerge.updateText(finalDocA[0], ["text"], " new text inserted...");

    // @ts-ignore
    console.log("After merge, User A sees:", finalDocA[0].text)
    // @ts-ignore
    console.log("After merge, User B sees:", finalDocB[0].text)

    //output: 
    // Initial document: hello world
    // index.ts:14 user A sees before merge:  hello wonderful world
    // index.ts:21 user B sees before merge:  hel Greetingsworld
    // index.ts:30 After merge, User A sees: hel Greetings wonderfulworld
    // index.ts:32 After merge, User B sees: hel Greetings wonderfulworld

}
//----

// let localChange: Automerge.Doc<{ text: string }> = Automerge.init();

export function MergeChanges(text: string, changes: Automerge.Change[]): string {
    let localChange: Automerge.Doc<{ text: string }> = Automerge.init();
    localChange = Automerge.from({ text });

    var convertedChanges = changes.map((change: Automerge.Change) => {
        return new Uint8Array(change);
    });

    console.log("converted changes ", convertedChanges);

    localChange = Automerge.applyChanges(localChange, convertedChanges)[0];

    console.log("merged changes ", localChange.text);

    return localChange.text as string;
}

// export function setInitialDocument(text: string) {
//     localChange = Automerge.from({ text });
// }

export function getChanges(text: string, changes: changeData[]): Automerge.Change[] {
    let localChange: Automerge.Doc<{ text: string }> = Automerge.init();
    localChange = Automerge.from({ text });

    let replica = Automerge.clone(localChange);

    changes.map((change: changeData) => {
        console.log(change);
        replica = Automerge.change(replica, d => {
            Automerge.splice(d, ["text"], change.from as number, change.to as number, change.text)
        });
    })

    var automergeChange = Automerge.getChanges(Automerge.init(), replica);

    localChange = Automerge.applyChanges(localChange, automergeChange)[0];
    
    console.log("localChange", Automerge.applyChanges(localChange, automergeChange));

    return automergeChange;
}