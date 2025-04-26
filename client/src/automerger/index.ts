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
        Automerge.splice(d, ["text"], 3, 3, "Greetings")
    })

    console.log("user B sees before merge: ", forkedByUser2.text) // "hello wonderful world"

    const changesA = Automerge.getChanges(Automerge.init(), forkedByUser1)
    const changesB = Automerge.getChanges(Automerge.init(), forkedByUser2)
    
    let finalDocA = Automerge.applyChanges(Automerge.init(), [...changesA, ...changesB])
    let finalDocB = Automerge.applyChanges(Automerge.init(), [...changesB, ...changesA])

    console.log("After merge, User A sees:", finalDocA[0].text)
    console.log("After merge, User B sees:", finalDocB[0].text)
    // var changes = Automerge.getChanges(forkedByUser1, forkedByUser2);
    // for (const change of changes) {
    //     const decoded = Automerge.decodeChange(change)
    //     console.log("Change by actor:", decoded.actor)
    //     console.log("Ops:", decoded.ops)
    // }
    // .map(change => {
    //     console.log("difference", change);
    // })

    // Make a concurrent change on the original document
    // doc = Automerge.change(doc, d => {
    //     // Insert at the start, delete 5 characters (the "hello")
    //     Automerge.splice(d, ["text"], 0, 5, "Greetings")
    // })

    // // Merge the changes
    // doc = Automerge.merge(doc, forked)

    // var x = Automerge.applyChanges(doc, changes);
    // console.log("Merged doc:", x);
    // doc = x[0];
    // console.log(doc.text) // "Greetings wonderful world"

}

// export function AutomergeTest2() {
//     // Initial document

//     // Start with a doc with text
//     let docA = Automerge.change(Automerge.init(), d => {
//         d.text = "hello world"
//     })
    
//     // Clone to simulate second user
//     let docB = Automerge.clone(docA)
    
//     console.log("Initial document:", docA.text.toString()) // "hello world"
    
//     // --- User A deletes "world"
//     docA = Automerge.change(docA, d => {
//         // Delete characters 6-11 (the "world")
//         for (let i = 0; i < 5; i++) {
//             d.text = d.text.slice(0, 6) + d.text.slice(7)
//         }
//     })
    
//     // --- User B adds " everyone" after "world"
//     docB = Automerge.change(docB, d => {
//         d.text = d.text.slice(0, 11) + " everyone" + d.text.slice(11)
//     })
    
//     // Now synchronize (merge both documents)
//     const changesA = Automerge.getChanges(Automerge.init(), docA)
//     const changesB = Automerge.getChanges(Automerge.init(), docB)
    
//     let finalDocA = Automerge.applyChanges(Automerge.init(), [...changesA, ...changesB])
//     let finalDocB = Automerge.applyChanges(Automerge.init(), [...changesB, ...changesA])
    
//     console.log("After merge, User A sees:", finalDocA.text)
//     console.log("After merge, User B sees:", finalDocB.text)
    

// }