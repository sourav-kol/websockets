import { changeData } from "@/types";
import { next as Automerge } from "@automerge/automerge"

//for testing purpose
//to be deleted later
export function AutomergeTest() {
    // 1. Create it ONCE (on server or Device A)
    let doc = Automerge.from({ text: "hello world" });

    // 2. Get the binary state of this empty doc
    const initialState = Automerge.save(doc)

    // 3. Send that 'initialState' to Device B via WebSocket
    // 4. On Device B, load it:
    let docA: Automerge.Doc<{ text: String }> = Automerge.load(initialState);
    let docB: Automerge.Doc<{ text: String }> = Automerge.load(initialState);

    let docC: Automerge.Doc<{ text: String }> = Automerge.from({ text: "hello world" });


    // console.log("Internal ID A:", Automerge.getObjectId(docA.text));
    // console.log("Heads A:", Automerge.getHeads(docA));

    // console.log("Internal ID B:", Automerge.getObjectId(docB.text));
    // console.log("Heads B:", Automerge.getHeads(docB));

    // let replicaA = Automerge.change(docA, d => {
    //     Automerge.splice(d, ["text"], 6, 1, "")
    // })

    let replicaB = Automerge.change(docB, d => {
        Automerge.splice(d, ["text"], 6, 1, "x")
    })

    const changesB = Automerge.getChanges(docB, replicaB);

    let xB = Automerge.applyChanges(docA, changesB)[0];

    let xC = Automerge.applyChanges(docC, changesB)[0];

    console.log("merged B", xB);

    console.log("merged C", xC);

}

export function AutomergeTest2() {
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

    for (const change of changesA) {
        const decoded = Automerge.decodeChange(change)
        console.log("changeA Ops:", decoded.ops)
    }
    const changesB = Automerge.getChanges(Automerge.init(), forkedByUser2)

    console.log("Internal ID A:", Automerge.getObjectId(forkedByUser1.text));
    console.log("Heads A:", Automerge.getHeads(forkedByUser1));

    console.log("Internal ID B:", Automerge.getObjectId(forkedByUser2.text));
    console.log("Heads B:", Automerge.getHeads(forkedByUser2));

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

let localChange: Automerge.Doc<{ text: string }> = Automerge.init();

export function setInitialDocument(text: string) {
    localChange = Automerge.from({ text });
}

export function MergeChanges(text: string, changes: Automerge.Change[]): string {
    var convertedChanges = changes.map((change: Automerge.Change) => {
        return new Uint8Array(change);
    });

    // for (const change of changes) {
    //     const decoded = Automerge.decodeChange(change)
    //     console.log("decoded: ", decoded)
    //     console.log("Ops:", decoded.ops)
    // }

    localChange = Automerge.applyChanges(localChange, convertedChanges)[0];

    return localChange.text as string;
}

export function getChanges(text: string, changes: changeData[]): Automerge.Change[] {
    let replica: Automerge.Doc<{ text: string }> = Automerge.clone(localChange);

    replica = Automerge.change(replica, d => {
        changes.map((change: changeData) => {
            Automerge.splice(d, ["text"], change.from as number, change.to as number, change.text)
        });
    })

    var automergeChange = Automerge.getChanges(localChange, replica);

    localChange = replica;

    return automergeChange;
}

export function generateSnaphot(): Uint8Array {
    return Automerge.save(localChange);
}

export function syncFromSnapshot(snapshot: Buffer): string {
    localChange = Automerge.load(new Uint8Array(snapshot));

    return localChange.text;
}

export function getText(): string {
    return localChange.text ?? "";
}