'use-client'
import { FormEvent, useEffect } from "react";
import FormCard from "@/components/form/form-card";
import { createUser } from "@/service/userService";
import { User } from "@/types";
import { useStorage } from "@/hooks/useStorage";
import { useRouter } from 'next/navigation'
import { sessionStorageKey } from "@/constants/constants";


export default function CreateUser() {
    const { setStoreItem, getStoreItem } = useStorage();
    const router = useRouter();

    useEffect(() => {
        getStoreItem(sessionStorageKey.userId) && router.push("/collaborate");
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        //@ts-expect-error
        const userName = e.target[0].value;
        let user: User = {
            name: userName,
            email: userName,
            password: ""
        }
        
        createUser(user)
            .then(res => {
                setStoreItem(sessionStorageKey.userId, res);
                router.push("/collaborate");
            });

        e.preventDefault();
    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <FormCard
                title="Enter user name"
                placeholder="Enter your name"
                onSubmit={handleSubmit}>
            </FormCard>
        </div>
    )
}