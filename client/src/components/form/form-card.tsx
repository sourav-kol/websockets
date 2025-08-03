'use-client'

import { FormEvent } from "react";

type Prop = {
    title: string;
    placeholder: string;
    buttonText?: string;
    onSubmit: (e: any) => {} //(e: FormEvent<HTMLFormElement>) => {}
}

export default function FormCard(props: Prop) {

    return (
        <div className="w-2/5 h-2/5  bg-gray-100 rounded-lg text-black">

            <h2 className="text-2xl text-center">{props.title}</h2>
            <form onSubmit={props.onSubmit} className="flex flex-col items-center">
                <input type="text" className="w-4/5 border-2 border-black-50" placeholder={props.placeholder}></input>
                <button type="submit" className="bg-black text-white px-4 py-2 rounded mt-2">{props.buttonText ?? "create"}</button>
            </form>
        </div>
    )
}