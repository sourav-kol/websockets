'use-client'
import { FormEvent, useEffect } from "react";
import FormCard from "@/components/form/form-card";
import { createGroup } from "@/service/groupService";
import { Group } from "@/types";
import { useRouter } from 'next/navigation';

export default function CreateGroup() {

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        //@ts-expect-error
        const groupName = e.target[0].value;
        let group: Group = {
            name: groupName
        }

        createGroup(group)
            .then(res => {
                router.push("/collaborate");
            });

        e.preventDefault();
    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <FormCard
                title="Enter group name"
                placeholder="Enter group"
                onSubmit={handleSubmit}>
            </FormCard>
        </div>
    )
}